- [ ] Tunelling With Ligolo-ng
- [ ] Port Forwarding With Ligolo

Tunelling With Ligolo-ng!!!
```sh
# ligolo proxy
proxy -selfcert
# ligolo agent
./agent -connect 10.10.14.119:11601 -ignore-cert
.\agent.exe -connect 192.168.11.138:11601 -ignore-cert
# tuntap interface
ip tuntap add user root mode tun ligolo1  
ip link set ligolo1 up
ip route add 172.17.5.0/24 dev ligolo1
# add listeners
```
Port Forwarding With Ligolo!!!
```sh
# start the proxy
proxy -selfcert

# run the aggent
agent -connect 10.8.0.3:11601 -ignore-cert
.\agent.exe -connect 192.168.49.120:11601 -ignore-cert

# setup the interface
ip tuntap add user root mode tun ligolo1  
ip link set ligolo1 up

# add the route
ip route add 240.0.0.1/32 dev ligolo1

ip route add 172.18.0.0/16 dev ligolo1
```
