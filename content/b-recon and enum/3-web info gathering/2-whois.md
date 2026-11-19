```
WHOIS is a widely used query and response protocol designed to access databases that store information about registered internet resources. Primarily associated with domain names, WHOIS can also provide details about IP address blocks and autonomous systems. 

Think of it as a giant phonebook for the internet, letting you look up who owns or is responsible for various online assets.
```
![[Pasted image 20250604214746.png]]
Why WHOIS Matters for Web Recon!!!
![[Pasted image 20250604214904.png]]
```sh
whois inlanefreight.com
port: 43/tcp
# enumeration
whois -h <HOST> -p <PORT> "domain.tld"
echo "domain.tld" | nc -vn <HOST> <PORT>
# sql injection
whois -h <Victim_ip> -p 43 "a') or 1=1#"
```
Utilising WHOIS!!!
```sh
# senarios1:

# senarios2:

```

