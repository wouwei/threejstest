
//var io = require("socket.io");
//var socket = io.listen(8080,"127.0.0.1");
var people = {};

function eHandler(socket) {

socket.on("connection",function(client) {
		client.on("join",function(name) {
				people[client.id]= name;
				client.emit("update","You have connected to the server.");
				socket.sockets.emit("update",name+"has joined the server");
				socket.sockets.emit("update-people",people);
				
			});
			
		client.on("send",function(msg) {
				socket.sockets.emit("chat",people[client.id],msg);
			});
			
		client.on("disconnect",function() {
				socket.sockets.emit("update",people[client.id]+"has left the server.");
				delete people[client.id];
				socket.sockets.emit("update-people",people);
			});
	});
	}
	
exports.eHandler = eHandler;
