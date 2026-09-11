$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot
$files = Get-ChildItem public/locales -Filter *.json
foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        $noBom = $bytes[3..($bytes.Length - 1)]
        [System.IO.File]::WriteAllBytes($f.FullName, $noBom)
        Write-Output ("Removed BOM: " + $f.Name)
    }
}
