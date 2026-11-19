Prominent Windows Exploits!!!!
![[Pasted image 20250609214742.png]]
```
MS08-67
MS17-010
Sigred CVE 2020-1350
SeriousSam CVE 2021-36934
ZeroLogon CVE 2020-1472
```
Enumerating Windows & Fingerprinting Methods!!!!
```sh
# identify windows host based on TTL
A typical response from a Windows host will either be 32 or 128. This value may not always be exact, but should be arround these values...

# nmap OS scan
nmap -v -O 10.129.201.97

# banner grabing
nmap -v 10.129.201.97 --script banner.nse
# vulnerability scan
nmap -p139,445 --script smb* -v 10.129.201.97
use exploit/windows/smb/ms17_010_psexec
```
![[Pasted image 20250609230614.png]]
Bats, DLLs, & MSI Files, Oh My!!!
![[Pasted image 20250609223956.png]]
```
.MSI and Powershell
```
![[Pasted image 20250609224116.png]]
Payload Generation!!!
![[Pasted image 20250609224211.png]]
