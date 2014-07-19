
var http = require('http'),
url = require('url'),
fs = require('fs'),
io = require('socket.io'),
chat = require('./chat'),
index,contentType;

	
var server = http.createServer(function(request,response){
		console.log("path = "+request.url);
		if(request.url.indexOf('.css') !=-1) { contentType = 'text/css'; }
		else if(request.url.indexOf('.js') !=-1) { contentType = 'text/javascript';}
		else { contentType = 'text/html'; request.url='chat.html';} // default page here ! 
		
		fs.readFile('./'+request.url,function(err,data) {
				if(err) console.log(err);
				response.writeHead(200, {"Content-Type" : contentType });
				response.write(data);
				response.end();
			});

	}).listen(8080);
	
var socket = io.listen(server);
chat.eHandler(socket);

