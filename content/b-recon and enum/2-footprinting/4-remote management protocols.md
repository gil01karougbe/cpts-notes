- [ ] Linux remote management protocols
1-SSH!!!!
![[Pasted image 20250604072027.png]]
```
SSH v1 is vulnerable to MITM whereas SSHv2 is not.

In total, OpenSSH has six different authentication methods:
1. Password authentication
2. Public-key authentication
3. Host-based authentication
4. Keyboard authentication
5. Challenge-response authentication
6. GSSAPI authentication
```
sshd!!!
```sh
# default config
cat /etc/ssh/sshd_config  | grep -v "#" | sed -r '/^\s*$/d'
# dangerous config
PasswordAuthentication yes
PermitEmptyPasswords yes
# footprinting
ssh-audit.py 10.129.14.132
ssh -v cry0l1t3@10.129.14.132
ssh -v cry0l1t3@10.129.14.132 -o PreferredAuthentications=password
```
2-RSync!!!
![[Pasted image 20250604070402.png]]
```sh
# foorptinting
nmap -sV -p 873 127.0.0.1
nc -nv 127.0.0.1 873
# Enumerating an Open Share
rsync -av --list-only rsync://127.0.0.1/dev
# Sunc file with our attacking host
rsync -av rsync://127.0.0.1/dev
-e ssh or -e "ssh -p2222"
```
R-Services!!!
```
R-Services are a suite of services hosted to enable remote access or issue commands between Unix hosts over TCP/IP.

Much like telnet, r-services transmit information from client to server(and vice versa.) over the network in an unencrypted format, making it possible for attackers to intercept network traffic (passwords, login information, etc.) by performing man-in-the-middle (`MITM`) attacks.
```
![[Pasted image 20250604070744.png]]
![[Pasted image 20250604070929.png]]
```sh
# list of trusted hosts (ip/hostnames/users)
cat /etc/hosts.equiv
cat .rhosts
<username> <ip address>
<username> <hostname>
# Access Control & Trusted Relationships
R-service use PAM for user authentication onto a remote system; however, they also bypass this authentication through the use of the /etc/hosts.equiv and .rhosts files.
# footprinting
nmap -sV -p 512,513,514 10.0.17.2
# r commands
rlogin 10.0.17.2 -l htb-student
rusers -al 10.0.17.5
```
![[Pasted image 20250604075559.png]]
- [ ] Windows remote management protocols
![[Pasted image 20250604080140.png]]
RDP!!!!
```sh
nmap -sV -sC 10.129.201.248 -p3389 --script rdp*
# rdp security check
./rdp-sec-check.pl 10.129.201.248
# xfreerdp
xfreerdp /u:cry0l1t3 /p:"P455w0rd!" /v:10.129.201.248
```
WinRM!!!
![[Pasted image 20250604080736.png]]
```sh
nmap -sV -sC 10.129.201.248 -p5985,5986
evil-winrm -i 10.129.186.101 -u alex -p 'lol123!mD'
```
WMI!!!
![[Pasted image 20250604080718.png]]
```sh
The initialization of the WMI communication always takes place on TCP port 135, and after the successful establishment of the connection, the communication is moved to a random port.

impacket-wmiexec 
Cry0l1t3:"P455w0rD!"@10.129.201.248 "hostname"
```
