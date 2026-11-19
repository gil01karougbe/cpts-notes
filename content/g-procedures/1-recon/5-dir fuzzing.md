- [ ] Dirsearch
- [ ] Fuzz Faster U Fool - Ffuf
- [ ] Gobuster
- [ ] Feroxbuster

dirsearch!!!
```sh
dirsearch -u http://10.10.10.10/
```
ffuf!!!
```sh
ffuf -c -u -u http://10.10.10.10/FUZZ -w wordlist.txt

ffuf -c -ic -u http://94.237.55.157:59178/blog/FUZZ.php -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt:FUZZ

ffuf -c -ic -u http://94.237.55.157:59178/blog/FUZZEXT -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt:FUZZ -w /usr/share/wordlists/seclists/Discovery/Web-Content/web-extensions.txt:EXT

ffuf -ic -c -u http://conversor.htb/FUZZ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -e .php

ffuf -ic -c -v -recursion -recursion-depth 1 -u http://conversor.htb/FUZZ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -e .tar,.tar.gz
```
gobuster!!!
```sh
gobuster dir -u http://10.129.228.213:8080 -w /usr/share/seclists/Discovery/Web-Content/common.txt

gobuster dir -u http://192.168.147.120/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x .php
```
feroxbuster!!!
```sh
feroxbuster -u http://conversor.htb/

feroxbuster -u http://conversor.htb/ -x zip,bak,rar,txt,gz,tar

feroxbuster -u 'http://conversor.htb/' -d 1 -C 401,403,404,500,501 -x zip,bak,rar,txt,gz,tar
```
