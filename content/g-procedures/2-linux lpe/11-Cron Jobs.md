- [ ] Enumeration
- [ ] Privileges Check

Enumeration!!!!
```sh
crontab -l
cat /etc/crontab
ls -la /etc/cron.daily/
# cron files location
ls -la /var/spool/cron
ls -la /etc/cron.d
# hunt for writable files
find / -path /proc -prune -o -type f -perm -o+w 2>/dev/null | less
# pspy
./pspys -pf -i 1000
```
Privileges Check!!!
```sh
ls -la
```