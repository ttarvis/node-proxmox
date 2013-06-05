var pmModule = require("/home/node-proxmox/lib/proxmox")('user', 'password', 'domain.com');
var assert = require("assert");


pmModule.getClusterStatus(function(err, response){
  if (err) throw err;
  else {
    data = JSON.parse(response);
    assert(response.data, !null, 'response null');
  }
});
