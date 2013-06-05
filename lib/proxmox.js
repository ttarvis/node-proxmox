var https = require("https");
var querystring = require("querystring");
var exec = require('child_process').exec;
var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports = function(name, pwd, hostname) {

  var apiURL = 'https://' + hostname + ':8006/api2/json';
  var authString = 'username=' + name + '&password=' + pwd;

  var token = {};
    token.CSRF = '';
    token.PVEAuth = '';
    token.timeStamp = 0;

  function curlCom() {
 
    var command = '';

    this.get = function(url) {
	command = 'curl -k ';
        command += ('-b ' + 'PVEAuthCookie='+token.PVEAuth);
	command += (' ' + apiURL + url); 
	return this;
    };
    this.post = function(url, data, header, cookie) {
	command = 'curl -XPOST -k '
	if (typeof cookie === 'string') command += ('-b '+ 'PVEAuthCookie='+cookie + ' ');
	if (typeof header === 'string') command += ('-H ' +'"'+'CSRFPreventionToken:' + header + '"'+' ');	   
	command += ('-d '+'"'+data+'"'+' ');
	command += (apiURL + url);
	return this;
    };
    this.put = function(url, data, header, cookie) {
	command = 'curl -X PUT -k '
        command += ('-b ' + 'PVEAuthCookie='+cookie + ' ');
	command += ('-H ' +'"'+'CSRFPreventionToken:' + header + '"'+' ');	   
	command += ('-d ' + data);
	return this;
    };
    this.delete = function(url, data, header, cookie) {
	command = 'curl -X DELETE -k ';
        command += ('-b ' + 'PVEAuthCookie='+cookie + ' ');
	command += ('-H ' +'"'+'CSRFPreventionToken:' + header + '"'+' ');	   
	command += ('-d ' + data);
	return this;
    };
    this.command = function() {
	return command;
    };
    return this; 
  };

  function curl(command, callback) {
    exec(command, function(err, stdout, stderr) {
        var data = stdout;
        callback(err, data);
    });
  };

  function authorize(path, data, callback, cb) {
    command = curlCom().post('/access/ticket',authString).command();

    curl(command, function(err, response) {
	if (err) throw err
	else {
	  response = JSON.parse(response);
	    token.CSRF = response.data.CSRFPreventionToken;
	    token.PVEAuth = response.data.ticket;
	    token.timeStamp = new Date().getTime();
	    if (typeof cb === 'function') cb(path, data, callback);
	}
    });
  };

  function makeRequest(method, path, data, callback){
    if (method == 'GET') {
      command = curlCom().get(path).command();
    }
    else if (method == 'POST') {
      command = curlCom().post(path, data, token.CSRF, token.PVEAuth).command();
    }
    else if (method == 'DEL') {
      command = curlCom().del().command();
    }
    else {
      command = curlCom().put().command();
    }
    
    curl(command, callback);
  };

  function get(path, data, callback) {
    if ( (token.timeStamp + 7200) < new Date().getTime() ) authorize(path, data, callback, get);
    else makeRequest('GET', path, data, callback);
  };

  function post(path, data, callback) {
    if ( (token.timeStamp + 7200) < new Date().getTime() ) authorize(path, data, callback, post);
    else {
	data = querystring.stringify(data);
	makeRequest('POST', path, data, callback);
    };
  };

  function del(path, data, callback) {
    if ( (token.timeStamp + 7200) < new Date().getTime() ) authorize(path, data, callback, del);
    else makeRequest('DEL', path, data, callback);
  };

  function put(path, data, callback) {
    if ( (token.timeStamp + 7200) < new Date().getTime() ) authorize(path, data, callback, put);
    else {
	data = querystring.stringify(data);
    	makeRequest('PUT', path, data, callback);
    }
  };

  return {
	  getClusterStatus: function(callback) {
		data = {};
         	get('/cluster/status', data, callback);
	   },
 	  getClusterBackupSchedule: function(callback) {
		data = {};
		get('/cluster/backup', data, callback);
	  },
	  getNodeNetworks: function(node,callback) {
		data = {};
		url = '/nodes/'+node+'/network';
		get(url, data, callback);
	  },
	  getNodeInterface: function(node, interface, callback) {
		data = {};
		url = '/nodes/'+node+'/network/'+interface;
		get(url, data, callback);
	  },
	  getNodeContainerIndex: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/openvz/';
		get(url, data, callback);
	  },
	  getNodeVirtualIndex: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/qemu';
		get(url, data, callback);
	  },
	  getNodeServiceState: function(node, service, callback) {
		data = {};
		url = '/nodes/'+node+'/services/'+service+'/state';
	    	get(url, data, callback);
	  },
	  getNodeStorage: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/storage';
	 	get(url, data, callback);
	  },
	  getNodeFinishedTasks: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/tasks';
		get(url, data, callback);
	  },
	  getNodeDNS: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/dns';
		get(url, data, callback);
	  },
	  getNodeSyslog: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/syslog';
		get(url, data, callback);
	  },
	  getNodeRRD: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/rrd';
		get(url, data, callback);
	  },
	  getNodeRRData: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/rrddata';
		get(url, data, callback);
	  },
	  getNodeBeans: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/ubfailcnt';
		get(url, data, callback);
	  },
	  getNodeTaskByUPID: function(node, upid, callback) {
		data = {};
		url = '/nodes/'+node+'/tasks/'+upid;
		get(url, data, callback);
	  },  
	  getNodeTaskLogByUPID: function(node, upid, callback) {
		data = {};
		url = '/nodes/'+node+'/tasks/'+upid+'/log';
		get(url, data, callback);
	  },
	  getNodeTaskStatusByUPID: function(node, upid, callback) {
		data = {};
		url = '/nodes/'+node+'/tasks/'+upid+'/status';
		get(url, data, callback);
	  },
	  getNodeScanMethods: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/scan';
		get(url, data, callback);
	  },
	  getRemoteiSCSI: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/scan/iscsi';
		get(url, data, callback);
	  },
	  getNodeLVMGroups: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/scan/lvm';
		get(url, data, callback);
	  },
	  getRemoteNFS: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/scan/nfs';
		get(url, data, callback);
	  },
  	  getNodeUSB: function(node, callback) {
		data = {};
		url = '/nodes/'+node+'/scan/usb';
	  },
	  getStorageVolumeData: function(node, storage, volume, callback) {
		data = {};
		url = '/nodes/'+node+'/storage/'+storage+'/content/'+volume;
		get(url, data, callback);
	  },
	  getStorageConfig: function(storage, callback) {
		data = {};
		url = '/storage/'+storage;
		get(url, data, callback);
	  },
	  getNodeStorageContent: function(node, storage, callback) {
		data = {};
		url = '/nodes/'+node+'/storage/'+storage+'/content';
		get(url, data, callback);
	  },
	  getNodeStorageRRD: function(node, storage, callback) {
		data = {};
		url = '/nodes/'+node+'/storage/'+storage+'/rrd';
		get(url, data, callback);
	  },
	  getNodeStorageRRDData: function(node, storage, callback) {
		data = {};
		url = '/nodes/'+node+'/storage/'+storage+'/rrddata';
		get(url, data, callback);
	  },
          openvz: {
		createOpenvzContainer: function(node, data, callback) {
		  url = '/nodes/' + node + '/openvz'
		  post(url, data, callback);
		},
		mountOpenvzPrivate: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/' + node + '/openvz/' + vmid + '/status/mount';
		  post(url, data, callback); 
		},
		shutdownOpenvzContainer: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/' + node + '/openvz/' + vmid + '/status/shutdown';
		  post(url, data, callback);
		},
		startOpenvzContainer: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/' + node + '/openvz/' + vmid + '/status/start';
		  post(url, data, callback);
		},
	 	stopOpenvzContainer: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/' + node + '/openvz/' + vmid + '/status/stop';
		  post(url, data, callback);
		},
		unmountOpenvzContainer: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/' + node + '/openvz/' + vmid + '/status/unmount';
		  post(url, data, callback);
		},
		migrateOpenvzContainer: function(node, vmid, target, callback) {
		  data = {'target': target};
		  url = '/nodes/' + node + '/openvz/' + vmid + '/migrate';
		  post(url, data, callback);
		},
		getContainerIndex: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/'+node+'/openvz/'+vmid;
		  get(url, data, callback);
		},
		getContainerStatus: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/'+node+'/openvz/'+node+'/status/current';
		  get(url, data, callback);
		},
		getContainerBeans: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/'+node+'/openvz/'+vmid+'/status/ubc';
		  get(url, data, callback);
		},
		getContainerConfig: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/'+node+'/openvz/'+vmid+'/config';
		  get(url, data, callback);
		},
		getContainerInitLog: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/'+node+'/openvz/'+vmid+'/initlog';
		  get(url, data, callback);
		},
		getContainerRRD: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/'+node+'/openvz/'+vmid+'/rrd';
		  get(url, data, callback);
		},
		getContainerRRDData: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/'+node+'/openvz/'+vmid+'/rrddata';
		  get(url, data, callback);
		},
		deleteOpenvzContainer: function(node, vmid, callback) {
		  data = {};
		  url = '/nodes/'+node+'/openvz'+vmid;
		  del(url, data, callback);
		},
		setOpenvzContainerOptions: function(node, vmid, data, calback) {
		  url = '/nodes/'+node+'/openvz/'+vmid+'/config';
		  put(url, data, callback);
		}
	  }
  }
};
