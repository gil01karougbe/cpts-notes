- [ ] Introduction to Web Shells
![[Pasted image 20250610074627.png]]
What is a Web Shell?
```
A web shell is a browser-based shell session we can use to interact with the underlying operating system of a web server.

Again, to gain remote code execution via web shell, we must first find a website or web application vulnerability that can give us file upload capabilities.
```
- [ ] Laudanum, One Webshell to Rule Them All
![[Pasted image 20250610075126.png]]
```sh
cd /usr/share/laudanum
https://github.com/jbarcia/Web-Shells/tree/master/laudanum

laudanum shell.aspx NB: add our ip address
```
![[Pasted image 20250611073324.png]]
```
http://status.inlanefreight.local/files/shell.aspx
```
![[Pasted image 20250611074648.png]]
- [ ] Antak Webshell
ASPX and a Quick Learning Tip!!!!
```
https://ippsec.rocks/?#
```
ASPX Explained!!!
![[Pasted image 20250611202250.png]]
Antak Webshell!!!
![[Pasted image 20250611202347.png]]
```sh
Antak web shell functions like a Powershell Console. However, it will execute each command as a new process. It can also execute scripts in memory and encode commands you send.

ls /usr/share/nishang/Antak-WebShell
cp /usr/share/nishang/Antak-WebShell/antak.aspx ~/antak.aspx
nano antak.aspx  line 14
```
![[Pasted image 20250611203618.png]]
![[Pasted image 20250611203728.png]]
![[Pasted image 20250611203853.png]]
- [ ] PHP Web Shells
![[Pasted image 20250611204231.png]]
Hands-on With a PHP-Based Web Shell!!!
```
rConfig 3.9.6 CVE-2022-44384 Unrestricted File Upload to RCE
https://nvd.nist.gov/vuln/detail/CVE-2022-44384

Authenticated File Upload 
```
![[Pasted image 20250611205016.png]]
```
Devices > Vendors and click Add Vendor -> vendor logo
```
![[Pasted image 20250611205310.png]]
![[Pasted image 20250611211021.png]]
```
NB:
Only the content-type header is validated by the app...
https://10.129.201.101/images/vendor/rce.php
```
![[Pasted image 20250611211127.png]]
Considerations when Dealing with Web Shells!!!
![[Pasted image 20250611211710.png]]
