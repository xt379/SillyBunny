// Entry point executed by the Electron shell (utilityProcess) inside the
// server payload directory. Loads server.js as ESM.
'use strict';
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
    try {
        await import(pathToFileURL(path.join(__dirname, 'server.js')).href);
    } catch (error) {
        console.error('[desktop-entry] server failed to start:', error);
        process.exit(1);
    }
})();
