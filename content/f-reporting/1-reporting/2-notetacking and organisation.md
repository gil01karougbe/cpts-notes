Tmux!!!
```sh
cd
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
touch .tmux.conf
tmux source ~/.tmux.conf
# start a session
tmux new -s setup
[Ctrl] + [B] + d
tmux at -t setup
tmux kill-session
tmux kill-session -t setup
```
Tmux Short-Cuts!!!
```
1-plugin install
`[Ctrl] + [B]` and then hit `[Shift] + [I]` (or `prefix` + `[Shift] + [I]`
2-start logging
`[Ctrl] + [B]` followed by `[Shift] + [P]` (`prefix` + `[Shift] + [P]`)
3-stop loggin
`prefix` + `[Shift] + [P]` key combo or type `exit` to kill the session
4-retroactive logging
`[Ctrl] + [B]` and then hitting `[Alt] + [Shift] + [P]` (`prefix` + `[Alt] + [Shift] + [P]`)
5-taking a screen capture
`[Ctrl] + [B]` followed by `[Alt] + [P]`
```
Tmux Panes!!
```
1-create new pane
[Ctrl] + [B] + %   - verticaly
[Ctrl] + [B] + "   - horizontaly

2-move the current pane
[Ctrl] + [B] + }
[Ctrl] + [B] + {

3-resize panes 
[Ctrl] + [B] + ->
[Ctrl] + [B] + <-

4-move from pane to pane
[Ctrl] + [B] + O
```
Tmux Plugin List!!!
```
https://github.com/tmux-plugins/list
https://www.youtube.com/watch?v=Lqehvpe_djs
```
System Modifications Tracking!!!!
![[Pasted image 20251018091148.png]]
Storage!!!
```sh
mkdir -p ACME-IPT/{Admin,Deliverables,Evidence/{Findings,Scans/{Vuln,Service,Web,'AD Enumeration'},Notes,OSINT,Wireless,'Logging output','Misc Files'},Retest}

tree ACME-IPT/
```
Note Tacking Structure!!!
```
Obsidian
```
- [ ] Formating and Redaction
```
Credentials and Personal Identifiable Information (`PII`) should be redacted in screenshots and anything that would be morally objectionable...

Wherever possible, we should try to use terminal output over screenshots of the terminal. It is easier to redact
```
Exercise!!!
```sh
xfreerdp /v:10.129.175.25 /u:htb-student /p:'HTB_@cademy_stdnt!'
```

