- [ ] Capturing Traffic
- [ ] Traffic Analysis

Capturing Traffic!!!
```sh
tcpdump -i eth0 http
tcpdump -i eth0 -w capture.pcap
timeout 5m tcpdump -i ens192 -w capture.pcap
```
Traffic Analysis!!!
```sh
python net-creds.py -i eth0 -f 192.168.0.2
python net-creds.py -p pcapfile
./Pcredz -f file-to-parse.pcap
./Pcredz -d /tmp/pcap-directory-to-parse/
./Pcredz -i eth0 -v
```
