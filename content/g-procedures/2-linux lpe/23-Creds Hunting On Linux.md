- [ ] Bash History
- [ ] Proc | Processes cmdlines
- [ ] Configuration Files
- [ ] SSH Keys
- [ ] Scripts Files
- [ ] KeyTab and CCache Files

Bash History!!!
```sh
# 1-Users Home directories
ls -la /home
ls -la /home/<user>
ls -la /home/<user>/.ssh
history
cat /home/<user>/.bash_history
# 2-History Files
find / -type f \( -name *_hist -o -name *_history \) -exec ls -l {} \; 2>/dev/null
```
Proc/Processes cmdlines!!!
```sh
find /proc -name cmdline -exec cat {} \; 2>/dev/null | tr " " "\n"
```
Configuration Files!!!
```sh
find / ! -path "*/proc/*" -iname "*config*" -type f 2>/dev/null

grep -iR passwd
```
SSH Keys!!!
```sh
ls ~/.ssh
ls -la /home/*/.ssh/id_rsa
ls -la /home/*/.ssh/
```
Scripts Files!!!
```

```
KeyTab and CCache Files!!!
```

```