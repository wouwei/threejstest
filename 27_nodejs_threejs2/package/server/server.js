/* THREEJS server v3 : server */

// VARS
var http = require('http');
var router = require(__dirname+'/router.js');


// server init 
create= http.createServer(function (request,response) {
			router.route(request,response);
		}).listen(8080); 


// export		
exports.create= create;

