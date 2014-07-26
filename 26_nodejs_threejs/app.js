/* threeception in nodejs v3 */

// var 
var io = require('socket.io');
var server = require('./package/server/server.js');
var app = require('./package/app/server.js');


var socket = io.listen(server.create);
app.eHandler(socket);
