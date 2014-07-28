/* THREEJS server v3 */

This server is built with the idea of serving clients running THREEJS on a page , fullscreen. 

Basically there's : 
the server : server.js
a router : router.js 

logic of the the router is to route to those directories :
* package :  contains at the same time the client and server logic . 
* modules : to the classic nodejs modules directory
* client : all what is static on the website , including js, css .

Logic for the client : 
<head>
	<script type="text/javascript" src="socket.io/socket.io.js"></script>
	<script type="text/javascript" src="package/app/client.js"></script>
	<script type="text/javascript" src="module/myothermodule/index.js"></script>
	<script type="text/javascript" src="three.min.js"></script>	
</head>

socket.io : module , it is out of this server control .
package : server will serve the app/client inside the package directory
module : server will server myothermodule/index.js in the node_modules directory 
*nothing* : 
				: the file is a .js : the server will serve the client/js/myfile.js
				: the file is a .css : the server will serve the client/css/myfile.css
				: the file is a .html : the server will server the client/myfile.html 
				
side note : index.html ( the default site page ) , will be searched in client/index.html
			* any weird page search like http://myserver/../.././../find_something_who_should_not_be_searched.js will send back the person to index.html

TODO Debug : 
* .html redirection . Since for now i work only with one page , this is not really an issue , but .. 

TODO : 
* extends the *nothing * to image folder.
	

