/* THREE in nodeJS V1 : Server Socket.io logic */

var Assets =new  require(__dirname+"/assets.js");
var assets = new Assets();





// Exchange logic here server side . 
function eHandler(socket) { 
		
		socket.on("connection",function(client){
				client.emit("assets",assets);
			});
	}
	
exports.eHandler = eHandler;