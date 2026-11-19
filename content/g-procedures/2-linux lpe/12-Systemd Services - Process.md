- [ ] Systemd Services
- [ ] Vulnerable Services
- [ ] Screen version 4.05.00 LPE

Systemd Services!!!
```sh
ps -ef --forest
systemctl list-units --type=service --all
systemctl list-units --type=service
ls /etc/systemd/system/
ls /lib/systemd/system/
ls /usr/lib/systemd/system/
```
Vulnerable Services!!!
```sh
apt list --installed | tr "/" " " | cut -d" " -f1,3 | sed 's/[0-9]://g' | tee -a installed_pkgs.list
```
Screen version 4.05.00 LPE!!!
```sh
# enumeration
screen -v
# exploit
Screen version 4.05.00 LPE
https://github.com/YasserREED/screen-v4.5.0-priv-escalate
# get root
./full-exploit.sh 
```