/*  THREE in nodeJS : ASSETS BUILDING V1 */


var init = function() {
		this.cube = new Element("Mesh");
		this.cube.Geometry("CubeGeometry",1,1,1);
		this.cube.Material("MeshLambertMaterial",0x0066FF);
		
		this.skybox= new Element("Mesh");
		this.skybox.Geometry("CubeGeometry",100,100,100);
		this.skybox.Material("MeshBasicMaterial",0x0066FF,"BackSide");
		
		this.light = new Light("pointLight");
		this.light.Init(0xff6600,0,2,2);
	
	}
	
//////////////
/* Element  */
//////////////

function Element(type) {
		this.type=(typeof type)?type:"";
		this.material = new Object();
		this.geometry = new Object();
		
		
		/* GEOMETRY OF AN ELEMENT */ 
		/* 	implemented :
			type : 	CubeGeometry ( partially )
			width,height,depth : size of a cube 
			posX,posY,posZ : position in the world
		*/
		this.Geometry = function(type,width,height,depth,posX,posY,posZ){ 
				geom = this.geometry;
				if(arguments[0]!=undefined) geom.type=type;
				if(arguments[1]!=undefined) geom.width=width;
				if(arguments[2]!=undefined) geom.height=height;
				if(arguments[3]!=undefined) geom.depth=depth;
				if(arguments[4]!=undefined) geom.posX=posX;
				if(arguments[5]!=undefined) geom.posY=posY;
				if(arguments[6]!=undefined) geom.posZ=posZ;
			};
		
		/* MATERIAL OF AN ELEMENT */
		/*	implemented :
			type : MeshLambertMaterial (partial),MeshBasicMaterial(partial)
			color : Hex value 
			side : FrontSide, BackSide, DoubleSide
		
		*/
		this.Material = function(type,color,side) { 
				mat = this.material;
				if(arguments[0]!=undefined) mat.type=type;
				if(arguments[1]!=undefined)mat.color=color;
				if(arguments[2]!=undefined)mat.side=side;
			};
	}

////////////	
/* Lights */
////////////
		/* 	implemented :
			type : pointLight ( partial)
			color : Hex value 
			posX,posY,posZ : position in the world 
		*/
function Light(type) {
		this.type=(typeof type)?type:"";
		
		
		this.Init = function(color,posX,posY,posZ) {
				if(arguments[0]!=undefined) this.color=color;
				if(arguments[1]!=undefined) this.posX=posX;
				if(arguments[2]!=undefined) this.posY=posY;
				if(arguments[3]!=undefined)this.posZ=posZ;
			}
	}

module.exports = init;	
	
