param(
    [Parameter(Mandatory=$true)][string]$Target
)
$ErrorActionPreference = 'Stop'
$lineRegex = [regex]'(?m)^(\s*)"((?:[^"\\]|\\.)*)":\s*"((?:[^"\\]|\\.)*)"(,?\s*)$'

if (Test-Path -LiteralPath $Target -PathType Container) {
    $files = Get-ChildItem -LiteralPath $Target -Filter '*.json' | Where-Object { $_.Name -ne 'en.json' -and $_.Name -ne 'lang.json' }
} else {
    $files = Get-Item -LiteralPath $Target
}

$grandTotal = 0
foreach ($file in $files) {
    $path = $file.FullName
    $content = [System.IO.File]::ReadAllText($path)
    $fileCount = 0
    $newContent = $lineRegex.Replace($content, {
        param($m)
        $indent = $m.Groups[1].Value
        $key = $m.Groups[2].Value
        $value = $m.Groups[3].Value
        $trail = $m.Groups[4].Value
        $newValue = $value
        $newValue = $newValue -creplace 'Silly Bunny Team', 'Fairy Team'
        $newValue = $newValue -creplace 'SillyBunny Team', 'Fairy Team'
        $newValue = $newValue -creplace 'Silly Bunny', 'Fairy'
        $newValue = $newValue -creplace 'SillyBunny', 'Fairy'
        $newValue = $newValue -creplace 'Silly Tavern', 'Fairy'
        $newValue = $newValue -creplace 'SillyTavern', 'Fairy'
        if ($newValue -ne $value) { $script:fileCount++ }
        $indent + '"' + $key + '": "' + $newValue + '"' + $trail
    })
    if ($newContent -ne $content) {
        $enc = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText($path, $newContent, $enc)
        Write-Output ("CHANGED: {0} ({1} values)" -f $file.Name, $fileCount)
        $grandTotal += $fileCount
    } else {
        Write-Output ("UNCHANGED: {0}" -f $file.Name)
    }
}
Write-Output ("Total values changed: {0}" -f $grandTotal)
