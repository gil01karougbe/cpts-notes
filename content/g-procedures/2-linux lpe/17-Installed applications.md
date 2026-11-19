- [ ] Enumeration
- [ ] Exploitation

Enumeration!!!
```sh
apt list --installed | tr "/" " " | cut -d" " -f1,3 | sed 's/[0-9]://g' | tee -a installed_pkgs.list
```
Exploitation!!!
```
Google application name and version ...
```