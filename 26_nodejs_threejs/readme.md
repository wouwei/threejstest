/* threeception in nodejs v1 */

This first app will run the basic 3D hello world ( a rotating cube ) . 



** APP LOGIC **
this app is built with those concepts in mind :
*client is the only one who does the rendering 
*server has all the assets

in the future versions :
*clients will send to the server their actions
*server will gather the clients versions , modify the asset env. , then dispatch the modifications to the clients



Regarding the assets : 
*server side : an interface allows to create minimized objects , the coding is nearing threejs coding . 
*client side : an interface " translate " the server side assets to threejs assets . 




**DIRECTORY LOGIC**
that "might" not be the common and healthy logic in nodejs but : 
client : serves all static files 
node_modules : where the npm imported nodejs modules are
package : modules which are more server / client oriented . 
	in each of those package module , there's at least an interaction with the client , 
	or at least a client.js file for the client and a server.js file for the server . 
	
