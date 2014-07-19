var http = require("http");

var testb = require('./testb');
http.createServer(function(request,response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World"+testb.Print());
	response.end();
}).listen(8080);