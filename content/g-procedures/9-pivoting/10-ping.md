- [ ] Linux
- [ ] Windows - cmd
- [ ] Windows - powershell

Linux!!!
```sh
# ping
for i in $(seq 1 254); do ping -c 1 172.18.0.$i & done | grep "64 bytes"
# fping
fping -asgq 172.16.9.0/24 
```
Windows - cmd!!!
```cmd
(for /L %a IN (1,1,254) DO ping /n 1 /w 1 172.16.210.%a) | find "Reply"
```
Windows - powershell!!!
```powershell
1..254 | % {"172.16.5.$($_): $(Test-Connection -count 1 -comp 172.16.5.$($_) -quiet)"}
```