- [ ] Enumeration With NetExec
- [ ] Enumeration With PowerView
- [ ] Enumerating ACLs with ADModule
- [ ] Enumerating ACLs With BloodHound

Enumeration With NetExec!!!
```sh
# Read all the ACEs of a target object
nxc ldap 192.168.1.48 -u raj -p Password@1 --kdcHost ignite.local -M daclread -o TARGET=Administrator ACTION=read
# Read ACEs a User (PRINCIPAL) has on a target object
nxc ldap lab-dc.lab.local -k --kdcHost lab-dc.lab.local -M daclread -o TARGET=Administrator ACTION=read PRINCIPAL=BlWasp
```
Enumeration With PowerView!!!
```powershell
# Import Module
Import-Module .\PowerView.ps1
# Hunt Fast
Find-InterestingDomainAcl
# From A User | What ACLs does the use wley has?
$sid = Convert-NameToSid wley
Get-DomainObjectACL -ResolveGUIDs -Identity * | ? {$_.SecurityIdentifier -eq $sid}
# From A Group | What ACLs does members of a group has?
$itgroupsid = Convert-NameToSid "Information Technology"
Get-DomainObjectACL -ResolveGUIDs -Identity * | ? {$_.SecurityIdentifier -eq $itgroupsid} -Verbose
# DCSync
$sid = Convert-NameToSid adun
$sid= "S-1-5-21-3842939050-3880317879-2865463114-1164"
Get-ObjectAcl "DC=inlanefreight,DC=local" -ResolveGUIDs | ? { ($_.ObjectAceType -match 'Replication-Get')} | ?{$_.SecurityIdentifier -match $sid} |select AceQualifier, ObjectDN, ActiveDirectoryRights,SecurityIdentifier,ObjectAceType | fl
```
Enumerating ACLs with ADModule!!!
```powershell
# list of all users
Get-ADUser -Filter * | Select-Object -ExpandProperty SamAccountName > ad_users.txt
# looping
foreach($line in [System.IO.File]::ReadLines("C:\Users\htb-student\Desktop\ad_users.txt")) {get-acl  "AD:\$(Get-ADUser $line)" | Select-Object Path -ExpandProperty Access | Where-Object {$_.IdentityReference -match 'INLANEFREIGHT\\wley'}}
```
Enumerating ACLs With BloodHound!!!
```sh
# bloodhound-python
docker run -v ${PWD}:/bloodhound-data -it bloodhound
bloodhound-python -c All -d inlanefreight.local -u forend -p 'Klmcargo2' -ns 172.16.5.5 --zip
echo "172.16.5.5 academy-ea-dc01.inlanefreight.local" | tee -a /etc/hosts
bloodhound-python -c All -d inlanefreight.local -u forend -p Klmcargo2 --auth-method kerberos -ns 172.16.5.5 --zip
# SharpHound
.\SharpHound.exe
.\SharpHound.exe -d domain -ldapuser '' -ldappassword ''
```
