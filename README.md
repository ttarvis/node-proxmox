# Node Proxmox

## A node.js client for proxmox. See [Proxmox wiki](http://pve.proxmox.com/wiki/Main_Page)

###### [Proxmox API wiki](http://pve.proxmox.com/wiki/Proxmox_VE_API)
###### [Proxmox API referene](http://pve.proxmox.com/pve2-api-doc/)

##### Note: Requires cURL because node https module does not correctly transfer custom headers without a signed certificate even if you accept unauthorized

##### Installation

  ```npm install proxmox```

or install from here.

###### Example:

    proxmox = require("proxmox")('user', 'password', 'domain.com');

    proxmox.getClusterStatus(function(err, response){
	if(err) throw err;
	else{
	  data = JSON.parse(response);
	  console.log(data);
	}
    });

Callback is a function of the form ```function(err, response){}```
data is an object, not a string.
everything else is a string

All returned responses are strings that can be parsed in to JSON as per the API reference.

    getClusterStatus(callback);

    getClusterBackupSchedule(callback);

    getNodeNetworks(node, callback);

    getNodeInterface(node, interface, callback);

    getNodeContainerIndex(node, callback);

    getNodeVirtualIndex(node, callback);

    getNodeServiceState(node, service, callback);

    getNodeStorage(node, callback);

    getNodeFinishedTasks(node, callback);

    getNodeDNS(node, callback);

    getNodeSyslog(node, callback);

    getNodeRRD(node, callback);

    getNodeRRDData(node, callback);

    getNodeBeans(node, callback);

    getNodeTaskByUPID(node, upid, callback);

    getNodeTaskStatusByUPID(node, upid, callback);

    getNodeTaskLogByUPID(node, upid, callback);

    getNodeTaskStatusByUPID(node, upid, callback);

    getNodeScanMethods(node, callback);

    getRemoteiSCSI(node, callback);

    getNodeLVMGroups(node, callback);

    getRemoteNFS(node, callback);

    getNodeUSB(node, callback);

    getStorageVolumeData(node, storage, volume, callback);

    getStorageConfig(storage, callback);

    getNodeStorageContent(node, storage, callback);

    getNodeStorageRRD(node, storage, callback);

    getNodeStorageRRDData(node, storage, callback);

    deleteNodeNetworkConfig(node, callback);

    deleteNodeInterface(node, interface, callback);

    deletePool(poolid, callback);

    setNodeDNSDomain(node, domain, callback);

    setNodeSubscriptionKey(node, key, callback);

    setNodeTimeZone(node, timezone, callback);

    setPoolData(poolid, data, callback);

    updateStorageConfiguration(storageid, data, callback);

### OpenVZ

    openvz.createOpenvzContainer(node, data, callback);

    openvz.mountOpenvzPrivate(node, vmid, callback);

    openvz.shutdownOpenvzContainer(node, vmid, callback);

    openvz.startOpenvzContainer(node, vmid, callback);

    openvz.stopOpenvzContainer(node, vmid, callback);

    openvz.unmountOpenvzContainer(node, vmid, callback);

    openvz.migrateOpenvzContainer(node, vmid, target, callback);

    openvz.getContainerIndex(node, vmid, callback);

    openvz.getContainerSTatus(node, vmid, callback);

    openvz.getContainerBeans(node, vmid, callback);

    openvz.getContainerConfig(node, vmid, callback);

    openvz.getContainerInitLog(node, vmid, callback);

    openvz.getContainerRRD(node, vmid, callback);

    openvz.getContainerRRDData(node, vmid, callback);

    openvz.deleteOpenvzContainer(node, vmid, callback);

    openvz.setOpenvzContainerOptions(node, vmid, data, callback);

### Qemu

    qemu.getStatusCurrent (node, qemu,, callback);

    qemu.start(node, qemu, callback);

    qemu.stop(node, qemu, callback);

    qemu.reset(node, qemu, callback);

    qemu.shutdown(node, qemu, callback);

    qemu.suspend(node, qemu, callback);

    qemu.rrd(node, qemu, callback);

    qemu.rrdData (node, qemu, callback);

    qemu.getConfig(node, qemu, callback);

    qemu.putConfig(node, qemu, data, callback);

    qemu.postConfig(node, qemu, data, callback);

    qemu.pending(node, qemu, callback);

    qemu.unlink(node, qemu, data, callback);

    qemu.vncproxy (node, qemu, callback);

    qemu.vncwebsocket(node, qemu, data, callback);

    qemu.sendkey(node, qemu, data, callback);

    qemu.feature (node, qemu, data, callback);

    qemu.clone (node, qemu, data, callback);

    qemu.moveDisk (node, qemu, data, callback);

    qemu.migrate (node, qemu, data, callback);

    qemu.monitor (node, qemu, data, callback);

    qemu.resize (node, qemu, data, callback);

    qemu.template (node, qemu, callback);

    ### snapshot  

    qemu.shapshot.list(node, qemu, callback);

    qemu.snapshot.snapshot(node, qemu, snapname, callback);

    qemu.snapshot.getConfig(node, qemu, snapname, callback);

    qemu.snapshot.putConfig(node, qemu, snapname, data, callback);

    qemu.snapshot.rollback(node,qemu, snapname, callback);

### To Do:
completed tests, examples, documentation, add methods for pool, node, KVM
