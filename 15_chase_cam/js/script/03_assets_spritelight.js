// GENERIC IMPLEMENTATION V2  //
// spritelight is composed of one sphere + 6 lights which are on top bottom left right up down of the object . 
// the object can is defined by calling spritelight.geometry() . Variables are : 
// - radius of the spritelight 
// - the colour 
// - the number of horizontal and vertical segments : low numbers will " cube " you sphere .( cannot be under 3 ) . 
function spritelight() {
	
	// var 
	this.object = new Array(7);
	this.spriteRadius;
	this.geometry = geometry;
	this.position = position;
	this.sceneAdd = sceneAdd;
	this.move = move;
	this.rotate = rotate;
	
	
	
	// object geometry 
	//radius — sphere radius.
	//widthSegments — number of horizontal segments. 
	//heightSegments — number of vertical segments.
	// colour — color of the sphere + color of the light .
	function geometry(radius,widthSegment,heightSegment,colour) {
			// var 
			this.spriteRadius = radius ;

			
			// defining geometry 
			spriteGeom= new THREE.SphereGeometry(radius,widthSegment,heightSegment);
			dirtimg = new THREE.ImageUtils.loadTexture(DIR_IMG+'dirt_temperate.png');
			var spriteMaterial = new THREE.MeshLambertMaterial({  color : colour, emissive : colour, ambient : 0x000000  });
			
			
			// defining lights 
			spriteLight = new THREE.PointLight(colour,1,10);
			
			
			// defining object 
			this.object[0]=new THREE.Mesh(spriteGeom,spriteMaterial);
			
			for(i=1;i<this.object.length;i++) {
				this.object[i]=spriteLight.clone();
			}
		}
		
	//=> object position 
	// vector3(posX,posY,posZ)
	function position(posX,posY,posZ) {
		
		this.object[0].position.set	(posX					,posY				,posZ				);
		this.object[1].position.set	(posX+this.spriteRadius*2	,posY				,posZ				);
		this.object[2].position.set	(posX-this.spriteRadius*2	,posY				,posZ				);
		this.object[3].position.set	(posX					,posY+this.spriteRadius*2,posZ				);
		this.object[4].position.set	(posX					,posY-this.spriteRadius*2,posZ				);
		this.object[5].position.set	(posX					,posY				,posZ+this.spriteRadius*2);
		this.object[6].position.set	(posX					,posY				,posZ-this.spriteRadius*2);
		
	}
	
	//=> object scene adding 
	function sceneAdd() {
		for(i=0;i<this.object.length;i++) {
			scene.add(this.object[i]);
		}
	}
	
	//=> object moving 
	// axis = if we move along X , Y , Z 
	// movement = speed .
	function move(axis,movement) {
		switch(axis) {
			case "Z" : 	for(i=0;i<this.object.length;i++) { this.object[i].translateZ(movement);}
						break;
			case "Y" :	for(i=0;i<this.object.length;i++) { this.object[i].translateY(movement);}
						break;
			case "X" :	for(i=0;i<this.object.length;i++) { this.object[i].translateX(movement);}
						break;
		}
	}
	
	//=> object rotating 
	// axis : if we rotate along XZ plane => "X" , or YZ plane => "Z" or whatever we want .
	// rotation : speed : angle size per seconds . linked with THREE.Clock();
	function rotate(axis,rotation) {
		rotationVector = (axis=="X")? new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0);
		
		
		
		for(i=0;i<this.object.length;i++) { this.object[i].rotateOnAxis(rotationVector,rotation);}
		
	}
	
}
