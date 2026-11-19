- [ ] Anonymous Bind Enumeration
- [ ] Users Enumeration
- [ ] Active Directory Objects Enumeration

Anonymous Bind Enumeration!!!
```sh
ldapwhoami -x -H ldap://<IP Address>:389
```
Users Enumeration!!!
```sh
ldapsearch -h 172.16.5.5 -x -b "DC=INLANEFREIGHT,DC=LOCAL" -s sub "(&(objectclass=user))"  | grep sAMAccountName: | cut -f2 -d" "

./windapsearch.py --dc-ip 172.16.5.5 -u "" -U
```
Active Directory Objects Enumeration!!!
```sh
ldapsearch -x -H ldap://<IP Address:389 -s base -b "" "(objectClass=*)" "*" +
```

