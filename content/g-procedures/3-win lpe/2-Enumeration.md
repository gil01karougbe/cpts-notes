- [ ] System Information
- [ ] Networking
- [ ] Users And Groups
- [ ] Network Service
- [ ] Pipes

System Information!!!
```powershell
systeminfo
tasklist /svc
reg.exe query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Schedule\Tasks"
Get-WmiObject -Class Win32_Service | Where-Object { $_.State -eq "Running" }
Get-WmiObject -Class Win32_Product |  select Name, Version
```
Networking!!!
```powershell
ipconfig /all
arp -a
route print
```
Users And Groups!!!
```powershell
query user
echo %USERNAME%
whoami /priv
whoami /groups
net user
net localgroup
net localgroup administrators
net accounts
```
Network Service!!!
```powershell
.\netstat.ps1
.\services.ps1
```
Pipes!!!
```powershell
pipelist.exe /accepteula
gci \\.\pipe\
accesschk.exe /accepteula \\.\Pipe\lsass -v
```