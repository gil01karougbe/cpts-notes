```sh
# install sshuttle 
sudo apt-get install sshuttle
#  run sshuttle
sshuttle -r ubuntu@10.129.194.93 172.16.5.0/23 -v
# nmap
nmap -v -A -sT -p3389 172.16.5.19 -Pn

nb:
We can now use any tool directly without using proxychains.
```
