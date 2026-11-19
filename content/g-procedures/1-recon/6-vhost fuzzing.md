 - [ ] Fuzz Faster U Fool - Ffuf
 - [ ] Gobuster
 - [ ] Wfuzz
 - [ ] Burp Intruder
 
```sh
# 1. ffuf
ffuf -u http://trilocor.local -H "Host: FUZZ.trilocor.local" -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -mc 200

# 2. gobuster
gobuster vhost -u http://horizontall.htb -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain 

# 3. wfuzz
wfuzz -u http://metapress.htb -H "Host: FUZZ.metapress.htb" -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt  

# 4. burpsuite intruder
```
