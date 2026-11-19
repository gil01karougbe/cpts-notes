- [ ] Null Session Enumeration
- [ ] Shares Enumeration
- [ ] Users Enumeration
- [ ] Domain Password Policy Enumeration

Null Session  Enumeration!!!
```sh
nxc smb 172.16.5.5 -u '' - '' --shares
nxc smb $dc -u '' - '' --shares
rpcclient -U "" -N $dc
```
Shares Enumeration!!!
```sh
# From Linux
nxc smb 172.16.5.5 -u '' - '' --shares
nxc smb $DC -u '' -p '' -M spider_plus -o DOWNLOAD_FLAG=True OUTPUT_FOLDER=./output
# From Windows
net use \\DC01\ipc$ "" /u:""
net use \\DC01\ipc$ "" /u:guest
```
Users Enumeration!!!
```sh
enum4linux -U 172.16.5.5  | grep "user:" | cut -f2 -d"[" | cut -f1 -d"]"
rpcclient -U "" -N 172.16.5.5
rpcclient $> enumdomusers
crackmapexec smb 172.16.5.5 --users
nxc smb 172.16.5.5 --users
# RID Cyckling Attack
nxc smb HOST -u '' -p '' --rid-brute 10000
```
Domain Password Policy Enumeration!!!!
```sh
# From Linux
rpcclient -U "" -N 172.16.5.5
rpcclient $> querydominfo
enum4linux -P 172.16.5.5
enum4linux-ng -P 172.16.5.5 -oA ilfreight
nxc smb 172.16.5.5 -u '' -p '' --pass-pol

# From Windows
net accounts
import-module .\PowerView.ps1
Get-DomainPolicy
```
