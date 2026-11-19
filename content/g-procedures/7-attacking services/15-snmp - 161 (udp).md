- [ ] SNMP FootPrinting
- [ ] Dangerous Configs
- [ ] Connexion Strings Brute Force

SNMP FootPrinting!!!
```sh
nmap -sU -p161 -T4 -v IP
```
Dangerous Configs!!!
```sh
cat /etc/snmp/snmpd.conf | grep -v "#" | sed -r '/^\s*$/d'
# dangerous configs
rwuser noauth
rwcommunity <community string> <IPv4 address>
rwcommunity6 <community string> <IPv6 address>
```
Enumeration!!!
```sh
# nmap
nmap -p161 -sU --script snmp-* -v 192.168.206.149
# snmpbulkwalk

# snmpwalk
snmpwalk -v 1 -c public 192.168.161.156 NET-SNMP-EXTEND-MIB::nsExtendObjects
snmpwalk -v1 -c public -m all 192.168.161.149 > snmp1.out
snmpwalk -v2c -c public -m all 192.168.161.149 > snmp2.out
snmpwalk -v 2c -c public 192.168.161.149 NET-SNMP-EXTEND-MIB::nsExtendOutputFull > snmp.out
# snmp-check
snmp-check -t 192.168.40.1 -c public
```
Connexion Strings Brute Force!!!
```sh
# snmpwalk
snmpwalk -v2c -c public 192.168.40.1
# onesixtyone Bruteforce community String
onesixtyone -c /usr/share/wordlists/seclists/Discovery/SNMP/snmp.txt 10.129.14.128
# braa - Bruteforce specific OID
braa public@10.129.14.128:.1.3.6.*
```
SNMP RCE!!!
```sh
NET-SNMP-EXTEND-MIB
snmpwalk -v 1 -c public 192.168.161.149 NET-SNMP-EXTEND-MIB::nsExtendObjects

Ref:
https://book.hacktricks.wiki/en/network-services-pentesting/pentesting-snmp/snmp-rce.html

https://github.com/mxrch/snmp-shell
```
![[Pasted image 20251214164017.png]]
References!!!
[SNMP Hackticks](https://hacktricks.alquymia.com.br/network-services-pentesting/pentesting-snmp/index.html)