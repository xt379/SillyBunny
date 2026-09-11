'use strict';

const { app, BrowserWindow, dialog, utilityProcess } = require('electron');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const net = require('node:net');
const http = require('node:http');

const LOG_FILE = path.join(os.tmpdir(), 'fairy-desktop.log');
function log(msg) {
    const line = `${new Date().toISOString()} ${msg}\n`;
    try { fs.appendFileSync(LOG_FILE, line); } catch { /* ignore */ }
    console.log(msg);
}

const APP_TITLE = 'Fairy';
const FIRST_PORT = 4444;
const PORT_PROBE_LIMIT = 40;
const STARTUP_TIMEOUT_MS = 120_000;

let serverChild = null;
let mainWindow = null;
let serverDir = null;
let serverPort = 0;
let quitting = false;

// ---------------------------------------------------------------------------
// Locate the server payload
// ---------------------------------------------------------------------------
function findServerDirectory() {
    if (process.env.SILLYBUNNY_SERVER_DIR && fs.existsSync(process.env.SILLYBUNNY_SERVER_DIR)) {
        return process.env.SILLYBUNNY_SERVER_DIR;
    }
    // Packaged layout: <app>/resources/server
    const packaged = path.join(process.resourcesPath, 'server');
    if (fs.existsSync(path.join(packaged, 'server.js'))) {
        return packaged;
    }
    // Dev layout: repo root is <repo>/src/electron
    const dev = path.resolve(__dirname, '..', '..');
    if (fs.existsSync(path.join(dev, 'server.js'))) {
        return dev;
    }
    return null;
}

// ---------------------------------------------------------------------------
// Port helpers
// ---------------------------------------------------------------------------
function isPortFree(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.unref();
        server.once('error', () => resolve(false));
        server.listen(port, '127.0.0.1', () => {
            server.close(() => resolve(true));
        });
    });
}

async function choosePort() {
    for (let port = FIRST_PORT; port < FIRST_PORT + PORT_PROBE_LIMIT; port++) {
        if (await isPortFree(port)) {
            return port;
        }
    }
    return 0;
}

function waitForHttp(url, timeoutMs) {
    return new Promise((resolve) => {
        const deadline = Date.now() + timeoutMs;
        const attempt = () => {
            const req = http.get(url, (res) => {
                res.resume();
                resolve(true);
            });
            req.on('error', () => {
                if (Date.now() > deadline) {
                    resolve(false);
                } else {
                    setTimeout(attempt, 300);
                }
            });
            req.setTimeout(4000, () => {
                req.destroy();
            });
        };
        attempt();
    });
}

// ---------------------------------------------------------------------------
// Server child process
// ---------------------------------------------------------------------------
function startServer() {
    const entry = path.join(serverDir, '.desktop-entry.cjs');
    const modulePath = fs.existsSync(entry) ? entry : path.join(serverDir, 'server.js');
    const args = [
        '--port', String(serverPort),
        '--listen=false',
        '--browserLaunchEnabled=false',
    ];
    log(`[shell] forking server: ${modulePath} ${args.join(' ')}`);

    serverChild = utilityProcess.fork(modulePath, args, {
        cwd: serverDir,
        env: { ...process.env, SILLYBUNNY_SUPERVISED: '1' },
        stdio: 'pipe',
        serviceName: 'sillybunny-server',
    });

    if (serverChild.stdout) {
        serverChild.stdout.on('data', (d) => log(`[server] ${d.toString()}`));
    }
    if (serverChild.stderr) {
        serverChild.stderr.on('data', (d) => log(`[server-err] ${d.toString()}`));
    }

    serverChild.on('exit', (code) => {
        log(`[shell] server exited with code ${code}`);
        if (!quitting) {
            const msg = code === 0
                ? '服务器已退出。'
                : `服务器异常退出（代码 ${code}）。\n详情见日志：${LOG_FILE}`;
            dialog.showErrorBox(APP_TITLE, msg);
        }
        app.exit(code || 0);
    });
}

// ---------------------------------------------------------------------------
// Main window
// ---------------------------------------------------------------------------
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 950,
        minWidth: 1000,
        minHeight: 640,
        show: false,
        autoHideMenuBar: true,
        backgroundColor: '#101418',
        title: APP_TITLE,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            spellcheck: false,
        },
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Keep the window title stable instead of letting the page override it.
    mainWindow.on('page-title-updated', (event) => {
        event.preventDefault();
        mainWindow.setTitle(APP_TITLE);
    });

    const serverUrl = `http://127.0.0.1:${serverPort}/`;
    log(`[shell] waiting for server at ${serverUrl} ...`);
    waitForHttp(serverUrl, STARTUP_TIMEOUT_MS).then((ok) => {
        if (!mainWindow) return;
        if (ok) {
            mainWindow.loadURL(serverUrl);
        } else {
            dialog.showErrorBox(APP_TITLE, '等待服务器启动超时。请检查防火墙或端口冲突后重试。');
            app.quit();
        }
    });
}

// ---------------------------------------------------------------------------
// App lifecycle
// ---------------------------------------------------------------------------
const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
    app.quit();
} else {
    process.on('uncaughtException', (err) => {
        log(`[shell] uncaughtException: ${err && err.stack ? err.stack : err}`);
    });
    process.on('unhandledRejection', (reason) => {
        log(`[shell] unhandledRejection: ${reason && reason.stack ? reason.stack : reason}`);
    });

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.whenReady().then(async () => {
        serverDir = findServerDirectory();
        if (!serverDir) {
            dialog.showErrorBox(APP_TITLE, '找不到服务端文件（server.js）。请确认软件目录完整。');
            app.quit();
            return;
        }
        log(`[shell] server directory: ${serverDir}`);

        serverPort = await choosePort();
        if (!serverPort) {
            dialog.showErrorBox(APP_TITLE, '没有可用端口，无法启动。');
            app.quit();
            return;
        }
        log(`[shell] picked port ${serverPort}`);

        startServer();
        createWindow();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });

    app.on('window-all-closed', () => {
        app.quit();
    });

    app.on('before-quit', () => {
        quitting = true;
        if (serverChild) {
            try {
                serverChild.kill();
            } catch {
                /* ignore */
            }
            serverChild = null;
        }
    });
}
