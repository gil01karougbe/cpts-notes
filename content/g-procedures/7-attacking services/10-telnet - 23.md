- [ ] Telnet Service FootPrinting 
- [ ] Telnet Login Brute Force
- [ ] Telnet Connexion - Basic Commands

Telnet Service FootPrinting!!!
```sh
# nmap
nmap -p23 -sV -sC -v IP
nmap -p23 -n -sV --script "*telnet* and safe" <IP>
# msf
use auxiliary/scanner/telnet/telnet_version
```
Telnet Login Brute Force!!!
```sh
# hydra
hydra -l admin -P wordlist.txt IP telnet
# nmap
nmap -p 23 --script telnet-brute IP
# msf
use auxiliary/scanner/telnet/telnet_login
```
Telnet Connexion!!!
```sh
telnet $TARGET_IP
telnet <target-ip> <target-port>

```