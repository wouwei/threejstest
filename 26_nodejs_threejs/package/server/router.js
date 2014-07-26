/* THREEJS server v3 : router */

// VARS
url = require('url'),
fs = require('fs');
var contentType;





// common static routing ( IO socket IS routed directly in the io.listen ) .... 
function route(request,response) {
	
	// contentType 
	if(request.url.indexOf('.css') !=-1) { contentType = "text/css"; }
	else if (request.url.indexOf('.js') !=-1) { contentType = "text/javascript"; }
	else { contentType = "text/html"; }
	
	
	
	// routing regarding MODULES / PACKAGE / CLIENT static files 
	if(request.url.match(/^\/package/g)) { request.url="package"+request.url.replace("/package",""); }
	else if(request.url.match(/^\/module/g)) { request.url="node_modules"+request.url.replace("/module",""); }
	else {
			if(request.url.indexOf('.css') !=-1) { request.url="client/css"+request.url; }
			else if (request.url.indexOf('.js') !=-1) { request.url="client/js"+request.url; }
			else { request.url="client/index.html"+request.url;}
		}
	
	
	console.log(request.url);
	
	
	
	fs.readFile(request.url,function(err,data) {
		
		if(err) {
			
			//console.log(err);
			response.end();
			}
		else {
			response.writeHead(200, {"Content-Type" : contentType });
			response.write(data);
			response.end();
			}
	});	
}


// export
exports.route=route;