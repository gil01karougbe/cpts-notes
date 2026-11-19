- [ ] Possible Username Wordlist Crafting
- [ ] Kerbrute To Hunt For Valid Usernames
- [ ] List Of Valid Usernames (With Creds - Null Session - Guest Session)

Possible Username Wordlist Crafting!!!
```sh
username-anarchy --input-file names.txt

python3 script.py --url https://www.inlanefreight.com/index.php/contact/ --domain inlanefreight.com
```
Kerbrute To Hunt For Valid Usernames!!!
```sh
kerbrute userenum -d inlanefreight.local --dc 172.16.5.5 /opt/jsmith.txt
# wordlists
https://github.com/insidetrust/statistically-likely-usernames
```
List Of Valid Usernames (With Creds - Null Session - Guest Session)!!!
```sh
nxc smb 172.16.5.5 -u htb-student -p Academy_student_AD! --users

rpcclient -U "forend%Klmcargo2" 172.16.5.5
```
