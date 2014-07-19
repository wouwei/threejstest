var http = require("http");
var text = require("./test/text");
var domWrite = require("./domwrite");
var sendUser = text.Content();


http.createServer(function(request,response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(sendUser);
	response.end();
}).listen(8080);

