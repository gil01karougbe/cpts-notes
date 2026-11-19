- [ ] Hunting For Binaries With Missing or Modifiable .so
- [ ] Exploitation

Hunting For Binaries With Missing or Modifiable .so!!!
```sh
# list setuid binaries
find / -user root -perm -4000 -exec ls -ldb {} \; 2>/dev/null
# ldd
ldd /home/htb-student/shared_obj_hijack/payroll
readelf -d payroll  | grep PATH
strace ./payroll
ls -ld /development
# glibc version
strace /lib/x86_64-linux-gnu/libc.so.6
```
Exploitation!!!
```sh

```