var pmModule = require("../lib/proxmox")('user', 'pass', 'ip');
var assert = require("assert");

pmModule.qemu.getStatusCurrent('proxmoxTestbak',100,function(err, response){
  if (err) throw err;
  else {
    data = JSON.parse(response);
  console.log(data);
  }
});
