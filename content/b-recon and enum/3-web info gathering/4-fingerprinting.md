![[Pasted image 20250607105952.png]]
```
It help us as an operator to perform:
1-Targeted Attacks
2-Identify Misconfigurations
3-PrioritiseTargets
4-Builde a Comprehensive Profile for the target
```
Fingerprinting Techniques!!!
![[Pasted image 20250607110150.png]]
Tools!!!
```sh
# nc
nc -nv IP PORT
# curl
curl -I URL
# whatweb
whatweb URL
# nikto
nikto -h inlanefreight.com -Tuning b
```
Challenge!!!
```sh
echo '10.129.172.242  app.inlanefreight.local  dev.inlanefreight.local' >> /etc/hosts
```