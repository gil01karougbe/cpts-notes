- [ ] Firewall and IPS/IDS Evasion
```
A firewall is a security measure against unauthorized connection attempts from external networks. Every firewall security system is based on a software component that monitors network traffic between the firewall and incoming data connections and decides how to handle the connection based on the rules that have been set.

Intrusion detection system (IDS) and intrusion prevention system (IPS) are also software-based components. IDS scans the network for potential attacks, analyzes them, and reports any detected attacks.
```
Determine Firewall and thier rules!!!
```sh
# infos
dropped - no response from ther target - filtered
rejected - server returns RST

# SYN scan vs ACK scan
Nmap TCP ACK scan (-sA) method is much harder to filter for firewalls and IDS/IPS systems than regular SYN (-sS) or Connect scans (sT) because they only send a TCP packet with only the ACK flag.

nmap 10.129.2.28 -p 21,22,25 -sA
```
Detect IDS/IPS!!!
![[Pasted image 20250527114908.png]]
```
One method to determine whether such IPS system is present in the target network is to scan from a single host (`VPS`).

If at any time this host is blocked and has no access to the target network, we know that the administrator has taken some security measures. 

Accordingly, we can continue our penetration test with another VPS.
```
Decoys!!!
![[Pasted image 20250527115316.png]]
```sh
nmap 10.129.2.28 -p 80 -sS -Pn -n --disable-arp-ping --packet-trace -D RND:5
# Testing Firewall Rule
nmap 10.129.2.28 -n -Pn -p445 -O
# Scan by Using Different Source IP
nmap 10.129.2.28 -n -Pn -p 445 -O -S 10.129.2.200 -e tun0
```
DNS Proxying!!!
![[Pasted image 20250527115718.png]]
```sh
# SYN default scan
nmap 10.129.2.28 -p50000 -sS
# SYN scan from DNS port
nmap 10.129.2.28 -p50000 -sS --source-port 53
# interaction with the port
nc -nv --source-port 53 10.129.2.28 50000
```
![[Pasted image 20250527120115.png]]
![[Pasted image 20250527120128.png]]
- [ ] Easy Lab
```sh
# ack scan
nmap -sA --top-ports=10  -Pn -n --disable-arp-ping --max-retries 0 --packet-trace 10.129.2.80
# banner grabing
nc -nv 10.129.2.80 22
```
![[Pasted image 20250530100358.png]]
- [ ] Medium Lab
```sh
# ack scan
nmap -sA --top-ports=10  -Pn -n --disable-arp-ping --max-retries 0 --packet-trace 10.129.2.48
# udp scan
nmap -sU --top-ports=10  -Pn -n --disable-arp-ping --max-retries 0 --packet-trace 10.129.2.48
```
![[Pasted image 20250530101020.png]]
![[Pasted image 20250530101040.png]]
```sh
dig version.bind CHAOS TXT @10.129.2.48
nc -nv -u 10.129.2.48 53
```
![[Pasted image 20250530101633.png]]
- [ ] Hard Lab
```sh
nmap -sS --min-rate 5000  --source-port 53 10.129.2.47
# connexion with source port 53
nc -nv -p 50 10.129.2.47 50000
```
![[Pasted image 20250530105422.png]]
![[Pasted image 20250530105521.png]]
