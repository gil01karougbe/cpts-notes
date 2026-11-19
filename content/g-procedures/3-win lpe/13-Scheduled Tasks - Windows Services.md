- [ ] Windows Services
- [ ] Scheduled Tasks
- [ ] Windows Processes

Windows Service!!!
```powershell
# All Services
.\services.ps1 | Where-Object { $_.CanRestart -eq $true }
# Focus On One Service
Get-Service -Name auditTracker
sc.exe qc auditTracker
Get-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Services\Liferay"
sc.exe sdshow auditTracker
icacls "C:\DevelopmentExecutables\auditTracker.exe"
```
![[Pasted image 20251119202559.png]]
Scheduled Tasks!!!
```powershell
# 1.
schtasks /query /fo LIST /v | findstr /B /C:"Folder" /C:"TaskName" /C:"Run As User" /C:"Schedule" /C:"Scheduled Task State" /C:"Schedule Type" /C:"Repeat: Every" /C:"Comment"

schtasks /query /fo LIST /v | findstr /B /C:"Task To Run" /C:"TaskName" 
schtasks /query /fo LIST /v | findstr /B /C:"TaskName"
# 2.
schtasks /query /fo LIST /v
# 3. Focus on One Scheduled Task
Get-ScheduledTask -TaskName "BetaTask" | Format-List *
schtasks /query /tn BetaTask /v /fo list
schtasks /query /tn backup /v /fo list
```
Windows Processes!!!
```powershell
(Get-Process -Id 1136).StartInfo
```
