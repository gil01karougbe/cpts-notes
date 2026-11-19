- [ ] Types Of Reports
OSINT!!!!
![[Pasted image 20251018095921.png]]
Differences Across Assessment Types!!!!
```
1-Vulnerability Assessment (I or E)
authenticated or not authenticated scans + validation + no exploitation attemps

2-Penetration Testing
- black box: no info that the company name
- gray box: we have in-scope IP addresses/CIDR network ranges
- white box: where we may be given credentials, source code, configurations, and more.
  
zero evasion testing - hybrid evasive testing - evasive
```
Inter-Disciplinary Assessments!!!
![[Pasted image 20251018101018.png]]
```
1. Purple Team Style Assessments
2. Cloud Focused Penetration Testing
3. Comprehensive IoT Testing
4. Web Application Penetration Testing
5. Hardware Penetration Testing
```
Type Of Reports!!!
```
Draft Report
Final Report
Post-Remediation Report
Attestation Report (1 or 2 pages)
```
![[Pasted image 20251018102636.png]]
Other Deliverables!!!
```
1.Slide Deck
2.Spreadsheet of Findings
```
Vulnerability Notifications - Alert!!!
![[Pasted image 20251018102920.png]]
- [ ] Components Of a Report
Prioritizing Our Efforts!!!
```
We need to filter out to best focus our efforts and prioritize findings ...

1. Attack Chain
2. Executive Summary
3. Remediation Summary
4. Findings
5. Appendices
```
1-Writing an Attack Chain!!!
```

```
2-Writing a Strong Executive Summary!!!
![[Pasted image 20251018105719.png]]
Key Concepts!!!
```
The intended audience for the Executive Summary is typically the person that is going to be responsible for allocating the budget to fixing the issues we discovered.

1. It should be obvious, but this should be written for someone who isn't technical at all.
   
2. The reader doesn't do this every day. They don't know what Rubeus does, what password spraying means, blahblahblah

3. This may be the first time they've ever been through a penetration test.

4. Much like the rest of the world in the instant gratification age, their attention span is small. When we lose it, we are extraordinarily unlikely to get it back.
```
Do!!!
![[Pasted image 20251018110321.png]]
Do Not Do!!!
![[Pasted image 20251018110508.png]]
Vocabulary changes!!!
![[Pasted image 20251018110645.png]]
```
- Need to have a list of all findings
- Recognise client teams works if based on our finding some aspted to the assets have been well hardened
- Based of the findings list what does hardening skills does the client teams lack (configuration, coding, patching, ...)
```
3-Remediation Summary!!!!
![[Pasted image 20251018113129.png]]
```
some findings may have short term and long term recommendations...
Example 1: A missing patch
short term: push the missing patch
long term: review the patch management process

Example 1: A missing patch
short term: fix the code in production
long term: review SDLC
```
4-Findings!!!
![[Pasted image 20251018113100.png]]
5-Appendices!!!
![[Pasted image 20251018123059.png]]
```
1. Satic Appendices
scope, methodology, severity ratings, biography

2. Dynamic Appendices
Exploitation Attempts and Payloads, Compromised Credentials, Configuration Changes, Additional Affected Scope, Information Gathering, Domain Passwords Analysis
```