- [ ] Domain Enumeration
![[Pasted image 20250530232958.png]]
```
Senarios:
When we scrutinize the company's main web site we may, encounter a service that we have had little to do with before, it makes sense and is necessary to get to grips with it and find out what activities it consists of and what opportunities are available.
Principales:
```
![[Pasted image 20250530233312.png]]
Online Presence!!!
```sh
# crt.sh
curl -s https://crt.sh/\?q\=finea.ma\&output\=json | jq . | grep name | cut -d":" -f2 | grep -v "CN=" | cut -d'"' -f2 | awk '{gsub(/\\n/,"\n");}1;' | sort -u > subdomainlist
# hosts accessible vie the internet
for i in $(cat subdomainlist);do host $i | grep "has address" | grep finea.ma | cut -d" " -f1,4;done
# shodan
-f4 >> finea-ip.txt
shodan init aED7qj8hUMwoo0NWzM8PrynstRLAMBo1
for i in $(cat finea-ip.txt);do shodan host $i;done
# dns records
dig any inlanefreight.com
```
![[Pasted image 20250530234457.png]]
![[Pasted image 20250531000221.png]]
- [ ] Cloud Ressouces Enumeration
![[Pasted image 20250531001035.png]]
```sh
# aws google dorks
intext: inurl:amazonaws.com
# azure google dorks
intext: inurl:blob.core.windows.net
# view page source
# Domain.Glass
# GrayHatWarfare
```
- [ ] Staff
```sh
# LinkedIn
- job post
- employees about
- employees career

# Github
- employee accounts/repos
- companies repos
```

