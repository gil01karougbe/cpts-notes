- [ ] Normal Scanning
- [ ] Stealth Scanning

Normal Scanning!!!!
```sh
rustscan -a IP
rustscan -t 2000 -a IP
nmap -p -sC -sV -v -oN scan.full IP
nmap -sU -F -v IP
```
Stealth Scanning!!!
```sh
# ack scan
nmap -sA --top-ports=10  -Pn -n --disable-arp-ping --max-retries 0 --packet-trace 10.129.2.80
# source port
nmap -sS --min-rate 5000  --source-port 53 10.129.2.47
```