- [ ] Hosts Discovery
scan network range!!!
```sh
nmap 10.129.2.0/24 -sn -oA tnet | grep for | cut -d" " -f5
```
![[Pasted image 20250526200853.png]]
scan ip list!!!
```sh
# in a file
nmap -sn -oA tnet -iL hosts.lst | grep for | cut -d" " -f5
# list
nmap -sn -oA tnet 10.129.2.18 10.129.2.19 10.129.2.20| grep for | cut -d" " -f5
```
scan single ip!!!
```sh
nmap 10.129.2.18 -sn -oA host
# force icmp ping
nmap 10.129.2.18 -sn -oA host -PE --packet-trace
# disable arp ping
nmap 10.129.2.18 -sn -oA host -PE --packet-trace --disable-arp-ping
# ttl
ttl=64  Linux/Mac os
ttl=128 Windows
```
- [ ] Hosts and Ports Scanning
```sh
# basic top 10 ports scaning (-sS by default)
nmap 10.129.2.28 --top-ports=10 
-Pn: disable ICMP requests
-n: disable DNS resolution
--disable-arp-ping: disable arp requests
# coonect scan (-sT full handshake)
nmap 10.129.2.28 -F -sT
# udp scan
nmap 10.129.2.28 -F -sU
# version scan
nmap 10.129.2.28 -p445 -sV
```
![[Pasted image 20250526202525.png]]
- [ ] Saving Results
```sh
# all format
nmap 10.129.2.28 -p- -oA target
# Normal output
nmap 10.129.2.28 -p- -oN target
# Grepabled output
nmap 10.129.2.28 -p- -oG target
# XML Output
nmap 10.129.2.28 -p- -oX target
# Style sheets
xsltproc target.xml -o target.html
```
- [ ] Services Enumeration
```sh
# service detection
nmap 10.129.2.28 -p- -sV
# banner grabbing
nc -nv 10.129.2.28 25
```
![[Pasted image 20250526205626.png]]
- [ ] Nmap Scripting Engine
```sh
# default scripts (-sC)
nmap 10.129.2.28 -p- -sV -sC
# scripts category
nmap <target> --script <category>
# define specific scripts 
nmap 10.129.2.28 -p 25 --script banner,smtp-commands
# agressive scan (-A= -sV + -sC + -O)
nmap 10.129.2.28 -p 80 -A
# Vulnerability Assessment
nmap 10.129.2.28 -p 80 -sV --script vuln
```
- [ ] Performance
![[Pasted image 20250527105706.png]]
Timeouts!!!
![[Pasted image 20250527110344.png]]
```sh
# Default Scan
nmap 10.129.2.0/24 -F
# Optimized RTT
nmap 10.129.2.0/24 -F --initial-rtt-timeout 50ms --max-rtt-timeout 100ms
```
Max Retries!!!!
![[Pasted image 20250527110325.png]]
```sh
# Default Scan
nmap 10.129.2.0/24 -F
# Reduced Retries
nmap 10.129.2.0/24 -F --max-retries 0
```
Rates!!!
![[Pasted image 20250527110232.png]]
```sh
# Default Scan
nmap 10.129.2.0/24 -F -oN tnet.default
# Optimized scan
nmap 10.129.2.0/24 -F -oN tnet.minrate300 --min-rate 300
```
Timing!!!
![[Pasted image 20250527110152.png]]
```sh
# Default Scan
nmap 10.129.2.0/24 -F -oN tnet.default
# Insane scan
nmap 10.129.2.0/24 -F -oN tnet.T5 -T 5
```
- [ ] References
[nmap host discovery strategies](https://nmap.org/book/host-discovery-strategies.html)
