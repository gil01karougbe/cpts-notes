- [ ] Dorking
- [ ] Employees Names
- [ ] Breach Forums
- [ ] Traffic Analysis

Dorking!!!
```
inurl:inlanefreight.com, filetype:pdf
site:*.inlanefreight.com, filetype:pdf
site:*.inlanefreight.com, intext:email
site:*.inlanefreight.com, intext:'@inlanefreight.com'

intext:"@inlanefreight.com" inurl:inlanefreight.com
site:*inlanefreight.com intext:"@inlanefreight.com"
site:*.inlanefreight.com intext:email
```
Employees Names!!!
```sh
1-linkedin
linkedin2username -c dataprotect
2-github
3-stackoverflow
```
Breach Forums!!!
```

```
Traffic Sniffing!!!
```sh
timeout 300 tcpdump -i ens224 arp
timeout 5m tcpdump -i ens192 -w capture.pcap
```
