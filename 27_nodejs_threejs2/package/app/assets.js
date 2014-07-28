/*  THREE in nodeJS : ASSETS BUILDING V1 */


var init = function() {
		// material 
		orange = new MeshLambertMaterial(0xFF66FF);
		blue= new MeshBasicMaterial(0x0066FF,"BackSide");
		
		// objects
		this.cube = new Element("Mesh");
		this.cube.material = orange;
		this.cube.geometry = new BoxGeometry(1,1,1);
		this.cube.position = new Vector3(1,1,-10);
		
		this.sky = new Element("Mesh");
		this.sky.material = blue;
		this.sky.geometry = new BoxGeometry(100,100,100);
		this.sky.position = new Vector3(10,10,10);
		
		// lights
		this.light = new PointLight(0xFFFFFF);
		this.light.position = new Vector3(0,2,2);
	}

	
//////////////
/* Element  */
//////////////
function Element(type) {
		this.type=(typeof type)?type:"";
		this.material=new Object();
		this.geometry=new Object();
		this.position=new Object();
	}

	
//////////////	
/* MATERIAL */
//////////////
	
function MeshLambertMaterial (color) { // INCOMPLETE 
	this.type="MeshLambertMaterial";
	if(color!=undefined) this.color=color;
	}

function MeshBasicMaterial(color,side) { // INCOMPLETE 
	this.type="MeshBasicMaterial";
	if(color!=undefined) this.color=color;
	if(side !=undefined) this.side=side; // FrontSide, BackSide, DoubleSide
	}

//////////////	
/* GEOMETRY */
//////////////	
	
function BoxGeometry(width,height,depth) { // INCOMPLETE 
		this.type="BoxGeometry";
		if(width!=undefined) this.width=width;
		if(height!=undefined) this.height=height;
		if(depth!=undefined) this.depth=depth;
	}

	
//////////////	
/* POSITION */
//////////////

function Vector3 (x,y,z) {
	if(x!=undefined) this.x=x;
	if(y!=undefined) this.y=y;
	if(z!=undefined) this.z=z;
}

////////////
/* LIGHTS */
////////////
function PointLight(color,intensity,distance) {
		this.type="PointLight";
		if(color!=undefined) this.color=color;
		if(intensity!=undefined) this.intensity=intensity;
		if(distance!=undefined) this.distance=distance;
		this.position=new Object();
	}
	
module.exports = init;