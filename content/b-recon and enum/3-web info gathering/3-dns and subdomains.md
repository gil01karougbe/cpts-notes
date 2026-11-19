- [ ] DNS
```
The `Domain Name System` (`DNS`) acts as the internet's GPS, guiding your online journey from memorable landmarks (domain names) to precise numerical coordinates (IP addresses).
```
How DNS works!!!
![[Pasted image 20250607090704.png]]
```
1-computer check is cache
2-computer asks the resolver (usualy provided by ISP)
3-the resolver checks his cache/send a request to the Root Name server
4-the Root Name server return the TLD name server address to the resolver
5-the resolver request the TLD name server and gets back the address of the Authoritative Name server.
6-the Authoritative name server return the IP of the domain.
```
Hosts File!!!
```sh
# local resolution
C:\Windows\System32\drivers\etc\hosts
/etc/hosts
```
Why DNS Matters for Web Recon!!!
![[Pasted image 20250607093426.png]]
- [ ] Digging DNS
DNS Tools!!!
![[Pasted image 20250607094338.png]]
The Domain Information Groper!!!
```sh
# dig examples
dig domain.com
dig domain.com A
dig -x 192.168.1.1 @Resolver
dig +short domain.com
dig domain.com ANY
# Groping DNS
1-header
2-question section
3-answer section
4-footer
# challenge
dig A +short  inlanefreight.com
dig +short -x 134.209.24.248
dig +short MX facebook.com
```
![[Pasted image 20250607094751.png]]
- [ ] Subdomains
```
When exploring DNS records, we've primarily focused on the main domain (e.g., example.com) and its associated information. 
However, beneath the surface of this primary domain lies a potential network of subdomains...
```
Why is this important for web reconnaissance!!!
![[Pasted image 20250607095451.png]]
Subdomain Enumeration!!!
```sh
# active subdomain enumeration
1- directly interacting with the target domain DNS server
2- DNS zone transfer
3- brute-force enumeration (ffuf, gobuster, wfuzz, dnsenum)
# passive dns enumeration
1- https://crt.sh/
2- dorks (site:*.domain.com)
```
- [ ] Subdomains BruteForcing
![[Pasted image 20250607100015.png]]
```sh
# dnsenum
dnsenum --enum inlanefreight.com -f  /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-20000.txt -r
# ffuf
ffuf -c -u https://FUZZ.inlanefreight.com -w wordlist.txt
# gobuster
gobuster dns --domain "target.domain" --resolver "nameserver" --wordlist "/path/to/wordlist"
```
- [ ] DNS Zone Transfer
```
DNS zone transfers, a mechanism designed for replicating DNS records between name servers, can inadvertently become a goldmine of information for prying eyes if misconfigured.
```
What is a Zone Transfer!!!!
```
A DNS zone transfer is essentially a copy of all DNS records within a zone from one name server to another. 
This process is essential for maintaining consistency and redundancy across DNS servers.

However, if not adequately secured, unauthorised parties can download the entire zone file, revealing a complete list of subdomains, their associated IP addresses.
```
Zone File Transfer!!!
![[Pasted image 20250607101311.png]]
The Zone Transfer Vulnerability!!!
```
While zone transfers are essential for legitimate DNS management, a misconfigured DNS server can transform this process into a significant security vulnerability. 

The core issue lies in the access controls governing who can initiate a zone transfer.
```
axfr requests!!!
```sh
# zonetransfer.me
dig axfr @nsztm1.digi.ninja zonetransfer.me
# inlanefreight.htb 
dig axfr @10.129.173.24 inlanefreight.htb | grep IN | wc -l
```
![[Pasted image 20250607102409.png]]
- [ ] Virtual Hosts!!!
![[Pasted image 20250607102918.png]]Types of Virtual Hosting!!!!
```
Name-Based Virtual Hosting
IP-Based Virtual Hosting
Port-Based Virtual Hosting
```
Virtual Host Discovery Tools!!!
![[Pasted image 20250607103928.png]]
```sh
echo '94.237.59.174 inlanefreight.htb' >> /etc/hosts
# gobuster
gobuster vhost -u http://inlanefreight.htb:31785 -w wordlist.txt --append-domain
-t: number of thread
-k: ignore SSL/TLS certificate errors
-o: save output
# ffuf
ffuf -c -u http://94.237.59.174:31785 -H "Host: FUZZ.inlanefreight.htb" -w wordlist.txt
```
![[Pasted image 20250607104934.png]]
![[Pasted image 20250607105144.png]]
- [ ] Certificate Transparency Logs
What are Certificate Transparency Logs?
```

```
Searching In CT Logs!!!
```sh
curl -s "https://crt.sh/?q=x.com&output=json" | jq -r '.[] | select(.name_value | contains("dev")) | .name_value' | sort -u
```

