- [ ] User Account Control
- [ ] Check UAC Level
- [ ] Some Bypass Techniques - SystemPropertiesAdvanced.exe

User Account Control!!!
![[Pasted image 20251105071534.png]]
```
UAC should be enabled, and although it may not stop an attacker from gaining privileges, it is an extra step that may slow this process down and force them to become noisier.

The default RID 500 administrator account always operates at the high mandatory level.
With Admin Approval Mode (AAM) enabled, any new admin accounts we create will operate at the medium mandatory level by default and be assigned two separate access tokens upon logging in (A privileged token and an unprivileged one)
```
Check UAC Level!!!
```powershell
# check
REG QUERY HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\System\ /v EnableLUA
# Check UAC level
REG QUERY HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\System\ /v ConsentPromptBehaviorAdmin
```
Some Bypass Techniques - SystemPropertiesAdvanced.exe!!!
```

```

[DLL Hijaking UAC Bypass](https://egre55.github.io/system-properties-uac-bypass/)