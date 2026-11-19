- [ ] Bunch Of Staff To Test
- [ ] References

Bunch Of  Staff To Test!!!
```sh
# some common restricted shells
RBASH  RKSH    RZSH
# Command Injection
ls -l `pwd`
Passing commands as arguments...
# Command Substitution
echo `whoami`
echo $(id)
# Command Chaining
cd /tmp; sh
ls || /bin/bash
echo hi && whoami
cat file.txt | less
ls; /bin/bash

# Environment Variables
export PATH=/tmp:$PATH
export SHELL=/bin/bash
export LD_PRELOAD=/tmp/mylib.so
export EDITOR=/bin/bash
crontab -e

# Shell Functions
In some cases, it may be possible to escape from a restricted shell by using shell functions...
### mysh
mysh() { /bin/sh; }
mysh

### pwd 
pwd() { /bin/bash; }
pwd

# editors
vi
vim
nano
# 
man man
less
# ssh | login shell
ssh htb-user@10.129.205.109 bash
# list avauilable commans
compgen -c
```
References!!!
```
https://www.hackingarticles.in/multiple-methods-to-bypass-restricted-shell/

https://www.verylazytech.com/linux/bypassing-bash-restrictions-rbash

https://medium.verylazytech.com/shell-escapes-cheatsheet-214f05ae777e
```