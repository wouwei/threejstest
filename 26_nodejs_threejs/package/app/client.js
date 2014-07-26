/* THREE in nodejs logic V1 : client side , three logic + socket io logic */

//var 
var element=  new Object(); // all the objects sent to be rendered to the client 
var show=false; // if the elements are not ready , dont trigger what should not be triggered ...

// onload
window.onload=function() {

		/* INIT */
		// default 
		var socket = io.connect('127.0.0.1:8080');
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera ( 75, window.innerWidth / window.innerHeight, 0.1,1000);
		camera.position.z=5;
		var renderer = new THREE.WebGLRenderer({antialias : true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		
		
			
		function render() {
				requestAnimationFrame(render);
				renderer.render(scene,camera);
				if(show==true) rotate(element["cube"]); // just to see the cube rotating , this is out of this app logic .
			}
		render();
		
		/* SOCKET.IO : on first load , load assets */
		socket.on("assets",function(assets) {
						
						Create(assets);
						for(var key in element) { scene.add(element[key]); }
						show=true;
						
					});
		
};

// just to see the cube rotating , this is out of this app logic .
function rotate(cube) {
	cube.rotation.x +=0.1;
	cube.rotation.y +=0.1;
}


/* SOCKET.IO : load assets */
/*	info : 
	please go to the package/app/asset.js script to understand how the object "assets" was created 
*/

function Create(assets) {
	for (var key in assets) {
		
		//MESHES
		
		
		if(assets[key].type=="Mesh") 
			{
				
				// material
				link=assets[key].material;
				if(link.type=="MeshLambertMaterial") material= new THREE.MeshLambertMaterial();
				if(link.type=="MeshBasicMaterial") material= new THREE.MeshBasicMaterial(); 
				
				
				if(link.color) material.color.setHex(link.color);
				
				if(link.side) { // side : FrontSide, BackSide, DoubleSide
						if(link.side=="FrontSide") material.side = THREE.FrontSide;
						if(link.side=="BackSide") material.side = THREE.BackSide;
						if(link.side=="DoubleSide") material.side = THREE.DoubleSide;
					}
				
				
				// geometry
				link=assets[key].geometry;
				if(link.type=="CubeGeometry") geometry= new THREE.CubeGeometry(1,1,1);
				
				element[key]=new THREE.Mesh(geometry,material);
				
				if(link.width) element[key].scale.x=link.width;
				if(link.height) element[key].scale.y=link.height;
				if(link.depth) element[key].scale.z=link.depth;
				
				//position
				if(link.posX) element[key].position.x=link.posX;
				if(link.posY) element[key].position.y=link.posY;
				if(link.posZ) element[key].position.z=link.posZ;
			}
		

		
		// LIGHTS
		if(assets[key].type=="pointLight")
			{	
				link=assets[key];
				element[key]=new THREE.PointLight();
				
				if(link.color) element[key].color.setHex(link.color);
				if(link.posX) element[key].position.x=link.posX;
				if(link.posY) element[key].position.y=link.posY;
				if(link.posZ) element[key].position.z=link.posZ;
				
			}
		
	}
	
}
