var Promise = require('bluebird');
var Remote = require('ripple-lib').Remote;

var publicRippleServers = function(){
    return [
         {
            host: 's1.ripple.com' , port: 443 , secure: true
         },
         {
            host: 's-west.ripple.com' , port: 443 , secure: true
         },
         {
            host: 's-east.ripple.com' , port: 443 , secure: true
         }
    ];
}

var createRandomRemote = exports.createRandomRemote = function(servers){
    servers = servers || publicRippleServers();
    var idx = Math.floor(Math.random()*servers.length);
    return new Remote({
         //trace:   true,
         local_fee:      true,
//         fee_cushion:     1.5,
         trusted:        true,
         local_signing:  true,
         servers: [servers[idx]]
    });
}

var connect = exports.connect = function(timeout_sec, servers){
    var TIMEOUT_SEC = (timeout_sec || 10) * 1000;
    var remote = createRandomRemote(servers);
    return new Promise(function(resolve, reject){
        var to = setTimeout(function(){
            remote.disconnect();
            reject(new Error('timeout'));
        }, TIMEOUT_SEC);
        remote.connect(function(){
            clearTimeout(to);
            resolve(remote);
        })
    });
}

