Vhost!!!
```sh

```
Web Info Gathering!!!!
```sh
# curl
curl -I http://inlanefreight.htb:35153
# vhost enum
ffuf -c -u http://94.237.57.57:35153/ -H "Host: FUZZ.inlanefreight.htb" -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-110000.txt -fs 120
ffuf -c -u http://94.237.57.57:35153/ -H "Host: FUZZ.web1337.inlanefreight.htb" -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-110000.txt -fs 120
# vhosts results
web1337.inlanefreight.htb
dev.web1337.inlanefreight.htb
```
![[Pasted image 20250607124353.png]]

