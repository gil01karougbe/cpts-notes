- [ ] Enumerate Windows Services
- [ ] Enumerate Installed Programs
- [ ] Druva inSync

Enumerate Windows Services!!!
```powershell
.\services.ps1
.\services.ps1 | Where-Object { $_.CanRestart -eq $false }
```
Enumerate Installed Programs!!!
```powershell
cmd /c wmic product get name
wmic product get name, version

Get-ChildItem 'C:\Program Files', 'C:\Program Files (x86)' | ft Parent,Name,LastWriteTime
Get-ChildItem -path Registry::HKEY_LOCAL_MACHINE\SOFTWARE | ft Name
```
Druva inSync!!!
```powershell
netstat -ano | findstr 6064
get-process -Id 3324
get-service | ? {$_.DisplayName -like 'Druva*'}
```