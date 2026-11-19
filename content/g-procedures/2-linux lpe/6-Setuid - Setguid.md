- [ ] Setuid - Setguid Enumeration
- [ ] GtfoBins

Setuid - Setguid Enumeration!!!
```sh
# setuid
find / -user root -perm -4000 -exec ls -ldb {} \; 2>/dev/null

# setguid
find / -user srvadm -perm -6000 -exec ls -ldb {} \; 2>/dev/null
```
GtfoBins!!!
```
https://gtfobins.github.io/#+suid
```