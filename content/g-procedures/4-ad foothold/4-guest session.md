- [ ] Guest Session Enumeration
- [ ] Shares Enumeration
- [ ] Users Enumeration
- [ ] Domain Password Policy Enumeration

Guest Session  Enumeration!!!
```sh
nxc smb 172.16.5.5 -u guest -p '' --shares
rpcclient -U "" -N 172.16.5.5
```
Shares Enumeration!!!
```sh
# From Linux
nxc smb 172.16.5.5 -u a -p '' --shares
nxc smb 172.16.5.5 -u guest -p '' --shares
nxc smb $DC -u 'a' -p '' -M spider_plus -o DOWNLOAD_FLAG=True OUTPUT_FOLDER=./output
impacket-smbclient outdated.htb/guest:''@10.129.229.239
# From Windows
net use \\DC01\ipc$ "" /u:guest
```
Users Enumeration!!!
```sh
enum4linux -U 172.16.5.5  | grep "user:" | cut -f2 -d"[" | cut -f1 -d"]"
rpcclient -U "" -N 172.16.5.5
rpcclient $> enumdomusers
crackmapexec smb 172.16.5.5 --users
nxc smb 172.16.5.5 -u guest -p '' --users
# RID Cycling Attack
nxc smb HOST -u guest -p '' --rid-brute 10000
lookupsid.py guest@HOST -no-pass
```
Domain Password Policy Enumeration!!!
```sh
rpcclient -U "" -N 172.16.5.5
rpcclient $> querydominfo
enum4linux -P 172.16.5.5
enum4linux-ng -P 172.16.5.5 -oA ilfreight
nxc smb 172.16.5.5 -u 'a' -p '' --pass-pol
```