var http = require('http'),
url = require('url'),
fs = require('fs'),
io = require('socket.io'),
chat = require('chat'),
CLIENT_DIR ="client/",
contentType,Path;

	
var server = http.createServer(function(request,response){
		if(request.url.indexOf('.css') !=-1) { contentType = 'text/css'; Path='css/';}
		else if(request.url.indexOf('.js') !=-1 ) { contentType = 'text/javascript'; Path='js/';}
		else { contentType = 'text/html'; request.url='index.html';Path="";} // default page here ! 
		
		
		fs.readFile('./'+CLIENT_DIR+Path+request.url,function(err,data) {
				if(err) console.log(err);
				response.writeHead(200, {"Content-Type" : contentType });
				response.write(data);
				response.end();
			});

	}).listen(8080);

// will intercept even the script line 
// <script src="http://127.0.0.1:8080/socket.io/socket.io.js"></script>
// in index.html .
var socket = io.listen(server);
chat.eHandler(socket);
