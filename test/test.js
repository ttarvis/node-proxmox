var pmModule = require("../lib/proxmox")('user', 'password', 'server');
var assert = require("assert");
/*
pmModule.network.get('proxmoxTestbak','eth0',function(err, response){
  if (err) throw err;
  else {
    data = JSON.parse(response);
  console.log(data);
  }
});
*/
