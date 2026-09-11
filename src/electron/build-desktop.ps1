# One-click build: SillyBunny desktop (portable Electron app)
# Output: <Root>\SillyBunny-Desktop  (double-click fairy.exe to run)
# ASCII-only script (safe under Windows PowerShell 5.1)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$Root  = 'C:\Users\15107\SillyTavern-Launcher'
$Src   = Join-Path $Root 'SillyBunny'
$Out   = Join-Path $Root 'SillyBunny-Desktop'
$Shell = Join-Path $Src 'src\electron'
$Payload = Join-Path $Out 'resources\server'
$AppDir  = Join-Path $Out 'resources\app'

# --- checks ---------------------------------------------------------------
$eDist = Join-Path $Shell 'node_modules\electron\dist\electron.exe'
if (-not (Test-Path $eDist)) { throw 'Electron runtime missing. Run: cd src/electron; npm install (mirror ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/)' }
if (-not (Test-Path (Join-Path $Src 'server.js'))) { throw "Server source not found at $Src" }

Write-Host '== 1/4 clean output =='
if (Test-Path $Out) { Remove-Item -LiteralPath $Out -Recurse -Force }
New-Item -ItemType Directory -Path $Out -Force | Out-Null

Write-Host '== 2/4 copy & trim server payload =='
New-Item -ItemType Directory -Path $Payload -Force | Out-Null
robocopy $Src $Payload /E `
    /XD releases graphify-out .github screenshots output tests docs docker colab backups .playwright-cli .vscode .git electron `
    /XF *.log *.err *.zip `
    /NFL /NDL /NJH /NP /R:1 /W:1 | Out-Null
if ($LASTEXITCODE -ge 8) { throw 'robocopy payload failed' }

Copy-Item (Join-Path $Shell 'desktop-entry.cjs') (Join-Path $Payload '.desktop-entry.cjs')

Write-Host '== 2b patch BoringSSL-incompatible hashes (shake256 -> sha256) =='
$patch = { param($file)
    if (-not (Test-Path $file)) { throw "patch target missing: $file" }
    $t = [System.IO.File]::ReadAllText($file)
    $n = [regex]::Replace($t, "createHash\('shake256', \{ outputLength: 8 \}\)", "createHash('sha256')")
    if ($n -eq $t) { Write-Host '  (no shake256 found - already patched?)' }
    [System.IO.File]::WriteAllText($file, $n)
}
& $patch (Join-Path $Payload 'webpack.config.js')
& $patch (Join-Path $Payload 'src\users.js')

Write-Host '== 3/4 assemble electron runtime =='
robocopy (Join-Path $Shell 'node_modules\electron\dist') $Out /E /NFL /NDL /NJH /NP /R:1 /W:1 | Out-Null
if ($LASTEXITCODE -ge 8) { throw 'robocopy runtime failed' }

New-Item -ItemType Directory -Path $AppDir -Force | Out-Null
Copy-Item (Join-Path $Shell 'index.js') (Join-Path $AppDir 'index.js')
Set-Content -Path (Join-Path $AppDir 'package.json') -Value '{"name":"fairy-desktop","main":"index.js"}' -Encoding ascii

$dapp = Join-Path $Out 'resources\default_app.asar'
if (Test-Path $dapp) { Remove-Item -LiteralPath $dapp -Force }
Rename-Item -LiteralPath (Join-Path $Out 'electron.exe') -NewName 'fairy.exe'

Write-Host '== 4/4 summary =='
$exe = Join-Path $Out 'fairy.exe'
if (Test-Path $exe) {
    $mb = [math]::Round((Get-Item $exe).Length / 1MB, 1)
    Write-Host ("OK  fairy.exe ({0} MB) at {1}" -f $mb, $Out)
} else { throw 'fairy.exe missing after build' }
