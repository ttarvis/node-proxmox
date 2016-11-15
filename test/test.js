var pmModule = require("../lib/proxmox")('root@pam', 'j2x4y7S5', '10.32.5.24');
var assert = require("assert");

pmModule.qemu.getStatusCurrent('proxmoxTestbak',100,function(err, response){
  if (err) throw err;
  else {
    data = JSON.parse(response);
  console.log(data);
  }
});
