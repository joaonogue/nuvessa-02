$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot
$distPath = Join-Path $projectRoot "dist"
if (Test-Path -LiteralPath $distPath) { Remove-Item -LiteralPath $distPath -Recurse -Force }
New-Item -ItemType Directory -Path $distPath | Out-Null
$items = @("index.html","privacidade.html","termos.html","aviso-legal.html","404.html","_headers","robots.txt","sitemap.xml","assets","css","js")
foreach ($item in $items) { Copy-Item -LiteralPath (Join-Path $projectRoot $item) -Destination $distPath -Recurse -Force }
Write-Output "Build estático criado em $distPath"
