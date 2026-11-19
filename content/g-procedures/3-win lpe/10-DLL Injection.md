- [ ] Several methods for  executing a DLL injection
- [ ] LoadLibrary
- [ ] Manual Mapping
- [ ] Reflective DLL Injection
- [ ] DLL Hijacking

Several methods for  executing a DLL injection!!!
```
1-LoadLibrary
2-Manual Mapping
3-Reflective DLL Injection
4-DLL Hijacking | Search Order Abuse
```
LoadLibrary!!!
```c
HMODULE hModule = LoadLibrary("example.dll");
```
Manual Mapping!!!
![[Pasted image 20251108213618.png]]
Reflective DLL Injection!!!
![[Pasted image 20251108213643.png]]
DLL Hijacking - Search Order Abuse!!!
```powershell
# search order
A-Safe DLL Search Mode is enabled:
1. The directory from which the application is loaded.
2. The system directory.
3. The 16-bit system directory.
4. The Windows directory.
5. The current directory.
6. The directories that are listed in the PATH.

B-Safe DLL Search Mode is desabled:
1. The directory from which the application is loaded.
2. The current directory.
3. The system directory. C:\Windows\System32
4. The 16-bit system directory.
5. The Windows directory. C:\Windows\
6. The directories that are listed in the PATH.
   
# Find DLLs a target app is loading
1-Process Explorer
2-Procmon
3-PE Explorer

# Proxing
main.exe - malicoius.dll - library.dll - add() - main.exe

# Invalid Libraries
main.exe - library.dll - not found - malicious.dll
NB:
In procmon filter Path to *.dll and and result toNAME NOT FOUND
```


