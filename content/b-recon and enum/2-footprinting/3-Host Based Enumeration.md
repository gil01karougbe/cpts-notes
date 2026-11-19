- [ ] FTP
```sh
# def
FTP: File Transfer Protocol
# ports
Control channel through TCP port 21.
Data channel through TCP port 20.
# security
- FTP is a clear-text protocol
- Anonymous access
```
![[Pasted image 20250531002927.png]]
TFTP!!!
![[Pasted image 20250531135141.png]]
vsftpd!!!
```sh
# config file
/etc/vsftpd.conf
cat /etc/vsftpd.conf | grep -v "#"
# 
cat /etc/ftpusers
# Dangerous Settings
anonymous_enable=YES
anon_upload_enable=YES
hide_ids=YES
# common commands
ftp 10.129.14.136
status
debug
trace
ls -la
ls -R
wget -m --no-passive ftp://anonymous:anonymous@10.129.14.136
# tls+ftp
openssl s_client -connect 10.129.14.136:21 -starttls ftp
```
Footprinting the Service!!!
```sh
nmap -sV -p21 -sC -A 10.129.14.136
nc -nv 10.129.202.5 21 
# NSE scrpits location
/usr/share/nmap/scripts/
find /usr/share/nmap/scripts -type f -name ftp* 2>/dev/null
# anoymous
nmap -p21 --script ftp-anon 10.129.202.5 
```
![[Pasted image 20250602193058.png]]
- [ ] SMB
```sh
# def
SMB: Server Message Block is a client-server protocol that regulates access to files and entire directories and other network resources such as printers, routers, or interfaces shared on the network.
# Default Configuration
cat /etc/samba/smb.conf | grep -v "#\|\;"

# Dangerous Settings
guest ok = yes
writable = yes
browseable = yes
read only = no
# Downloading Files from an SMB server
smbclient -N -L //10.129.14.128
smbclient //10.129.14.128/notes
get file.txt
!ls
!cat file.txt
# Footprinting the Service
nmap 10.129.202.5 -sV -sC -p139,445
rpcclient -U "" 10.129.202.5
srvinfo
enumdomains
querydominfo
netshareenumall
enumdomusers
queryuser 0x3e9
# RID Cycle attack
for i in $(seq 500 1100);do rpcclient -N -U "" 10.129.14.128 -c "queryuser 0x$(printf '%x\n' $i)" | grep "User Name\|user_rid\|group_rid" && echo "";done
# Othe tools
enum4linux 10.129.202.5 -A
nxc smb 10.129.202.5 --shares -u '' -p ''
smbmap -H 10.129.202.5
```
samba!!!
```
An SMB server developed for Unix-based operating systems. Samba implements the Common Internet File System (CIFS) network protocol, a dialect of SMB.
```
![[Pasted image 20250602193809.png]]
![[Pasted image 20250602193951.png]]
- [ ] NFS
```
NFS: Network File System, is a network file system developed by Sun Microsystems and has the same purpose as SMB.
 - The purpose is to access file systems over a network as if they were local.
 - NFS is used between Linux and Unix systems. This means that NFS clients cannot communicate directly with SMB servers.
 - NFS is based on the Open Network Computing Remote Procedure Call (ONC-RPC/SUN-RPC) protocol exposed on TCP and UDP ports 111.
 - While NFS protocol version 3.0(nfsv3) authenticate computers, NfsV4 require the user to authenticate...
```
![[Pasted image 20250602200643.png]]
```sh
# default config
cat /etc/exports
# dangerous config
rw       | Read and write permissions.
insecure | Ports above 1024 will be used.
no_root_squas | All files created by root are kept with the UID/GID 0.
# footprinting service
nmap 10.129.202.5 -p111,2049 -sV -sC
nmap --script nfs* 10.129.202.5 -sV -p111,2049
showmount -e 10.129.202.5
# mount 
mkdir nfs-server
mount -t nfs 10.129.202.5:/var/nfs ./nfs2 -o nolock
mount -t nfs 10.129.202.5:/mnt ./nfs-server/ -o nolock
ls -n mnt/nfs/
umount ./nfs-server
umount ./out
```
![[Pasted image 20250602202448.png]]
- [ ] DNS
```
DNS: Domain Name System, is an integral part of the Internet as it's used to resolve domain names to real IPs.

DNS is mainly unencrypted. encrypted versions are DNS over TLS (DoT) or DNS over HTTPS (DoH).
```
![[Pasted image 20250602203045.png]]
![[Pasted image 20250602203215.png]]
```sh
# local DNS configuration files
cat /etc/bind/named.conf.local
# zone files
cat /etc/bind/db.domain.com
# Reverse Name Resolution Zone Files
cat /etc/bind/db.10.129.14
# dangerous configurations
allow-transfer
zone-statistics
# footprinting DNS
10.129.18.203
dig -x 10.129.18.203 @10.129.19.169
dig A DC1.inlanefreight.htb @10.129.228.211
dig ns inlanefreight.htb @10.129.228.211
dig CH TXT version.bind 10.129.228.211
dig any inlanefreight.htb @10.129.228.211
```
![[Pasted image 20250602205842.png]]
Zone Transfer!!!
![[Pasted image 20250602204850.png]]
```sh
dig axfr @10.129.19.169 inlanefreight.htb
dig axfr @10.129.19.169 ns.dev.inlanefreight.htb
dig axfr @10.129.19.169 internal.inlanefreight.htb
# subdomain enum
for sub in $(cat /opt/useful/seclists/Discovery/DNS/subdomains-top1million-110000.txt);do dig $sub.inlanefreight.htb @10.129.14.128 | grep -v ';\|SOA' | sed -r '/^\s*$/d' | grep $sub | tee -a 
# dnsenum
dnsenum --dnsserver 10.129.19.169 --enum -p 0 -s 0 -o subdomains.txt -f /opt/useful/seclists/Discovery/DNS/subdomains-top1million-110000.txt inlanefreight.htb
dnsenum --dnsserver 10.129.19.169 --enum -p 0 -s 0 -o subdomains.txt -f /usr/share/wordlists/seclists/Discovery/DNS/fierce-hostlist.txt dev.inlanefreight.htb
# notes
primary  - secondary
primary is always a master server
- secondary can have both roles master/slave.
- slaves fetches the SOA record of the relevant zone from the master at certain interval (the so-called refresh time)
```
![[Pasted image 20250602212940.png]]
![[Pasted image 20250602215303.png]]
![[Pasted image 20250602231310.png]]
- [ ] SMTP
```
SMTP: Simple Mail Transfer Protocol, is a protocol for sending emails in an IP network. It can be used between an email client and an outgoing mail server or between two SMTP servers.

port 25 by default or port 587. SMTP works unencrypted without further measures and transmits all commands, data, or authentication information in plain text. SMTP + SSL/TLS encryption port 465!

An essential function of an SMTP server is preventing spam using authentication mechanisms that allow only authorized users to send e-mails.

Most modern SMTP servers support the protocol extension ESMTP with SMTP-Auth.
```
![[Pasted image 20250602214401.png]]
![[Pasted image 20250602221223.png]]
```sh
# default config
cat /etc/postfix/main.cf | grep -v "#" | sed -r "/^\s*$/d"
# Dangerous Settings
mynetworks = 0.0.0.0/0  # open relay config
# footprinting the service
telnet 10.129.19.169 25
HELO mail1
EHLO mail1
VRFY root
VRFY robin
find /usr/share/nmap/scripts -type f -name smtp* 2>/dev/null
nmap 10.129.19.169 -sC -sV -p25
nmap 10.129.19.169 -p25 --script smtp-open-relay -v
nmap 10.129.19.169 -p25 --script smtp-enum-users -v
nmap 10.129.19.169 -p25 --script smtp* -v
# metasploit
use auxiliary/scanner/smtp/smtp_enum
set rhosts 10.129.19.169
set USER_FILE /htb/academy/cpts/footprinting-wordlist.txt
run
```
![[Pasted image 20250602225138.png]]
![[Pasted image 20250602224650.png]]
- [ ] IMAP/POP3
```
IMAP: Internet Message Access Protocol helps accessing emails from a mail server. Unlike POP3, IMAP allows online management of emails directly on the server and supports folder structures. 143,993

POP3: Post Office Protocol, on the other hand, does not have the same functionality as IMAP, and it only provides listing, retrieving, and deleting emails as functions at the email server. 110, 995
```
![[Pasted image 20250602221030.png]]
```sh
# configuration
dovecot-imapd, dovecot-pop3d
https://doc.dovecot.org/2.3/settings/core/
https://doc.dovecot.org/2.3/configuration_manual/service_configuration/
# dangerous configs
auth_anonymous_username
auth_debug
# Footprinting the Service (robin:robin)
nmap 10.129.188.215 -sV -p110,143,993,995 -sC
curl -k 'imaps://10.129.188.215' --user robin:robin
openssl s_client -connect 10.129.188.215:pop3s # pop3+tls
openssl s_client -connect 10.129.188.215:imaps # imap + tls
> a1 LOGIN robin robin
> a2 LIST "" "*"
> a3 SELECT "INBOX"
> a5 SELECT "DEV.DEPARTMENT.INT"
> a6 FETCH 1 BODY[]
> a7 FETCH 1 BODY[HEADER]
> a8 FETCH 1 BODY[TEXT]
```
![[Pasted image 20250603205940.png]]
![[Pasted image 20250603210235.png]]
![[Pasted image 20250602223340.png]]
![[Pasted image 20250602223353.png]]
- [ ] SNMP
```
SNMP: Simple Network Management Protocol, was created to monitor network devices. In addition, this protocol can also be used to handle configuration tasks and change settings remotely.

Thus, it is a protocol for monitoring and managing network devices. In addition, configuration tasks can be handled, and settings can be made remotely using this standard.
```
![[Pasted image 20250603210622.png]]
MIB!!!
![[Pasted image 20250603211637.png]]
OID!!!
```
An OID represents a node in a hierarchical namespace.

A sequence of numbers uniquely identifies each node, allowing the node's position in the tree to be determined.

The longer the chain, the more specific the information. Many nodes in the OID tree contain nothing except references to those below them.
```
SNMP!!!
```sh
# snmpv1
SNMPv1 is the first version of the protocol and is still in use in many small networks. It supports the retrieval of information from network devices, allows for the configuration of devices, and provides traps, which are notifications of events

SNMPv1 does not support encryption and has no built-in authentication mechanism.
# snmpv2
SNMPv2 existed in different versions. The version still exists today is v2c, and the extension `c` means community-based SNMP.

SNMPv2 has no built-in encryption.
# snmpv3
SNMPv3 require username/password authentication and transmission encryption (via pre-shared key) of the data
# community strings
Community strings can be seen as passwords that are used to determine whether the requested information can be viewed or not.
It is important to note that many organizations are still using SNMPv2, as the transition to `SNMPv3` can be very complex.
# default configs
cat /etc/snmp/snmpd.conf | grep -v "#" | sed -r '/^\s*$/d'
# dangerous configs
rwuser noauth
rwcommunity <community string> <IPv4 address>
rwcommunity6 <community string> <IPv6 address>
# snmp fooptinting
snmpwalk -v2c -c public 10.129.188.215
onesixtyone -c /usr/share/wordlists/seclists/Discovery/SNMP/snmp.txt 10.129.14.128
braa public@10.129.14.128:.1.3.6.*
```
![[Pasted image 20250603211315.png]]
![[Pasted image 20250603212742.png]]
- [ ] MySQL
```
MySQL is an open-source SQL relational database management system developed and supported by Oracle.

These databases are often stored in a single file with the file extension .sql, for example, like wordpress.sql.
```
![[Pasted image 20250603213355.png]]
```sh
# default configuration
cat /etc/mysql/mysql.conf.d/mysqld.cnf | grep -v "#" | sed -r '/^\s*$/d'
# dangerous configuration
secure_file_priv | This variable is used to limit the effect of data import and export operations
debug | This variable indicates the current debugging settings
sql_warnings
# mysql service footprinting
nmap 10.129.188.215 -sV -sC -p3306 --script mysql*
mysql --skip-ssl -h 10.129.188.215 -u robin -probin
```
![[Pasted image 20250603215724.png]]
- [ ] MSSQL
```
MSSQL: MicroSoft SQL, is Microsoft's SQL-based relational database management system. Unlike MySQL, which we discussed in the last section, MSSQL is closed source and was initially written to run on Windows operating systems.

There are versions of MSSQL that will run on Linux and MacOS.

Port: 1433
```
MSSQL CLients!!
```
1-SSMS: SQL Server Management Studio
2-HeidiSQL
3-impacket-mssqlclient, SQLPro,sqsh, mssqlpwner
```
MSSQL Default Databases!!!
![[Pasted image 20250603214724.png]]
```sh
# default configs
SQL service will likely run as NT SERVICE\MSSQLSERVER.
Windows Authentication is used by default and encryption is not enforced...
# service footprinting
nmap --script ms-sql-info,ms-sql-empty-password,ms-sql-xp-cmdshell,ms-sql-config,ms-sql-ntlm-info,ms-sql-tables,ms-sql-hasdbaccess,ms-sql-dac,ms-sql-dump-hashes --script-args mssql.instance-port=1433,mssql.username=sa,mssql.password=,mssql.instance-name=MSSQLSERVER -sV -v -p 1433 10.129.222.137
# msfconsole
impacket-mssqlclient backdoor@10.129.222.137 -windows-auth
mssqlpwner backdoor:'Password1'@10.129.222.137 interactive -windows-auth 
```
![[Pasted image 20250603215351.png]]
![[Pasted image 20250603221540.png]]
- [ ] Oracle TNS
```
Oracle TNS: Oracle Transparent Network Substrate is a communication protocol that facilitates communication between Oracle databases and applications over networks.

TNS supports various networking protocols between Oracle databases and client applications, such as IPX/SPX and TCP/IP protocol stacks.
```
![[Pasted image 20250603223328.png]]
```sh
# default configs
Listener listens for incoming connections on the TCP/1521 port.

The TNS listener is configured to support various network protocols, including TCP/IP, UDP, IPX/SPX, and AppleTalk.

By default, Oracle TNS can be remotely managed in Oracle 8i/9i but not in Oracle 10g/11g.

Oracle TNS only accepts connexion from authorized hosts, performs ip/hostname/username/password authentication and uses Oracle Net Services to encrypt the communication between the client and the server.
# config files location
tnsnames.ora and listener.ora at $ORACLE_HOME/network/admin

# service footprinting
nmap -p1521 -sV 10.129.237.131 --open
nmap -p1521 -sV 10.129.237.131 --open --script oracle-sid-brute
# Oracle Database Attacking Tool (ODAT)
python3 odat.py all -s 10.129.237.131 # SID Bruteforcing
python3 odat.py all -s 10.129.237.131 --accounts-files logins.txt  pwds.txt
python3 odat.py utlfile -s 10.129.237.131 -d XE -U scott -P tiger --sysdba --putFile C:\\inetpub\\wwwroot testing.txt ./testing.txt
curl -X GET http://10.129.237.131/testing.txt

https://github.com/quentinhardy/odat/wiki
# sqlplus connexion
sqlplus scott/tiger@10.129.237.131/XE
sqlplus scott/tiger@10.129.237.131/XEXDB
sqlplus scott/tiger@10.129.237.131/XE as sysdba
# sqlplus commands
select table_name from all_tables;
select name, password from sys.user$;
```
![[Pasted image 20250603223935.png]]
![[Pasted image 20250603224317.png]]
![[Pasted image 20250603224453.png]]
![[Pasted image 20250603231256.png]]
![[Pasted image 20250604062703.png]]
```
[+] 'XE' is a valid SID. Continue...
[+] 'XE' is a valid Service Name. Continue...
[+] 'XEXDB' is a valid Service Name. Continue...
```
![[Pasted image 20250604064122.png]]
- [ ] IPMI
```
IPMI: Intelligent Plateform Management Interface is a set of standardized specifications for hardware-based host management systems used for system management and monitoring. Port: 623(udp)

IPMI provides sysadmins with the ability to manage and monitor systems even if they are powered off or in an unresponsive state.

IPMI is typically used in three ways:
- Before the OS has booted to modify BIOS settings
- When the host is fully powered down
- Access to a host after a system failure
```
![[Pasted image 20250604054333.png]]
```sh
# notes
Systems that use the IPMI protocol are called Baseboard Management Controllers (BMCs).

BMCs are built into many motherboards but can also be added to a system as a PCI card. Most servers either come with a BMC or support adding a BMC.

Common BMCs: HP iLO, Dell DRAC, and Supermicro IPMI

Gaining access to a BMC is nearly equivalent to physical access to a system. we can monitor, reboot, power off, or even reinstall the host operating system.

Many BMCs expose:
- a web-based management console.
- some sort of command-line remote access protocol such as Telnet or SSH.
- The port 623 UDP, which is for the IPMI network protocol.
# nmap
nmap -sU --script ipmi-version -p 623 ilo.inlanfreight.local

# msfconsole
use auxiliary/scanner/ipmi/ipmi_version
use auxiliary/scanner/ipmi/ipmi_dumphashes 
# ipmipwner
python3 ipmipwner.py --host 10.129.202.5
# flow in the RAKP protocol in IPMI 2.0
hashcat -m 7300 ipmi.txt -a 3 ?1?1?1?1?1?1?1?1 -1 ?d?u
john ipmi.txt
# ipmi tool
ipmitool -I lanplus -C 0 -H 172.16.9.25 -U ADMIN -P ADMIN user list
```
Defaults Credentials!!!
![[Pasted image 20250604055547.png]]
![[Pasted image 20250604071930.png]]
![[Pasted image 20250604071904.png]]
```
https://gbe0.com/posts/security/cracking-ipmi-passwords/
```

