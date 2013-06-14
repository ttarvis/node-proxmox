# Node Proxmox

## A node.js client for proxmox. See [Proxmox wiki](http://pve.proxmox.com/wiki/Main_Page)

Alt-H6 [Proxmox API wiki](http://pve.proxmox.com/wiki/Proxmox_VE_API)
Alt-H6 [Proxmox API referene](http://pve.proxmox.com/pve2-api-doc/)

Alt-H5 Note: Requires libcurl because node https module requires signed certificate

Alt-H5 Installation
  ```npm install proxmox```
or install from here.

Alt-H6 Example:
  ```proxmox = require("proxmox")('user', 'password', 'domain.com');```
  
   ```proxmox.getClusterStatus(function(err, response){
	if(err) throw err;
	else{
	  data = JSON.parse(response);
	  console.log(data);
	}
    });```

Callback is a function of the form ```function(err, response){}```
data is an object, not a string.
everything else is a string

All returned responses are strings that can be parsed in to JSON as per the API reference.

  ```getClusterStatus(callback);```

  ```getClusterBackupSchedule(callback);```

  ```getNodeNetworks(node, callback);```

  ```getNodeInterface(node, interface, callback);```

  ```getNodeContainerIndex(node, callback);```

  ```getNodeVirtualIndex(node, callback);```

  ```getNodeServiceState(node, service, callback);```

  ```getNodeStorage(node, callback);```

  ```getNodeFinishedTasks(node, callback);```

  ```getNodeDNS(node, callback);```

  ```getNodeSyslog(node, callback);```

  ```getNodeRRD(node, callback);```

  ```getNodeRRDData(node, callback);```

  ```getNodeBeans(node, callback);```

  ```getNodeTaskByUPID(node, upid, callback);```

  ```getNodeTaskStatusByUPID(node, upid, callback);```

  ```getNodeTaskLogByUPID(node, upid, callback);```

  ```getNodeTaskStatusByUPID(node, upid, callback);```

  ```getNodeScanMethods(node, callback);```

  ```getRemoteiSCSI(node, callback);```

  ```getNodeLVMGroups(node, callback);```

  ```getRemoteNFS(node, callback);```

  ```getNodeUSB(node, callback);```

  ```getStorageVolumeData(node, storage, volume, callback);```

  ```getStorageConfig(storage, callback);```

  ```getNodeStorageContent(node, storage, callback);```

  ```getNodeStorageRRD(node, storage, callback);```
  
  ```getNodeStorageRRDData(node, storage, callback);```

  ```deleteNodeNetworkConfig(node, callback);```

  ```deleteNodeInterface(node, interface, callback);```

  ```deletePool(poolid, callback);```

  ```setNodeDNSDomain(node, domain, callback);```

  ```setNodeSubscriptionKey(node, key, callback);```

  ```setNodeTimeZone(node, timezone, callback);```

  ```setPoolData(poolid, data, callback);```

  ```updateStorageConfiguration(storageid, data, callback);```

### OpenVZ

  ```openvz.createOpenvzContainer(node, data, callback);```

  ```openvz.mountOpenvzPrivate(node, vmid, callback);```

  ```openvz.shutdownOpenvzContainer(node, vmid, callback);```

  ```openvz.startOpenvzContainer(node, vmid, callback);```

  ```openvz.stopOpenvzContainer(node, vmid, callback);```

  ```openvz.unmountOpenvzContainer(node, vmid, callback);```

  ```openvz.migrateOpenvzContainer(node, vmid, target, callback);```

  ```openvz.getContainerIndex(node, vmid, callback);```

  ```openvz.getContainerSTatus(node, vmid, callback);```

  ```openvz.getContainerBeans(node, vmid, callback);```

  ```openvz.getContainerConfig(node, vmid, callback);```

  ```openvz.getContainerInitLog(node, vmid, callback);```

  ```openvz.getContainerRRD(node, vmid, callback);```

  ```openvz.getContainerRRDData(node, vmid, callback);```

  ```openvz.deleteOpenvzContainer(node, vmid, callback);```

  ```openvz.setOpenvzContainerOptions(node, vmid, data, callback);```
  

### To Do:
completed tests, examples, documentation, add methods for pool, node, KVM

