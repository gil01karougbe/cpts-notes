- [ ] Hunt For Accounts with Reversible Encryption Pwd Storage Set
- [ ] Exploitation

Hunt For Accounts with Reversible Encryption Pwd Storage Set!!!
```powershell
# PowerView
Get-DomainUser -Identity * | ? {$_.useraccountcontrol -like '*ENCRYPTED_TEXT_PWD_ALLOWED*'} |select samaccountname,useraccountcontrol
# ADModule
Get-ADUser -Filter 'userAccountControl -band 128' -Properties userAccountControl

Get-ADUser -Filter {AllowReversiblePasswordEncryption -eq "true"} | Select Name, sAMAccountName
```
Exploitation!!!
```
DCsync -> Recover clear text passwords
```