// GENERIC IMPLEMENTATION V2  //
// need FACTORIZATION for MULTI SPRITES ..

// Geometry : 
//radius — sphere radius.
//widthSegments — number of horizontal segments. 
//heightSegments — number of vertical segments.
// colour — color of the sphere + color of the light . 
// ** TODO : dirtimg should not be there **
// ** TODO managing correctly objects , this is dirty . 

function spritelightGeometry(radius,widthSegment,heightSegment, colour) {
		spriteLight = new THREE.PointLight(colour,1,10);
		spriteLightb = spriteLight.clone();
		spriteLightc = spriteLight.clone();
		spriteLightd = spriteLight.clone();
		spriteLighte = spriteLight.clone();
		spriteLightf = spriteLight.clone();
		
		spriteGeom = new THREE.SphereGeometry(radius,widthSegment,heightSegment);
		dirtimg = new THREE.ImageUtils.loadTexture(DIR_IMG+'dirt_temperate.png');
		var spriteMaterial = new THREE.MeshLambertMaterial({  color : colour, emissive : colour, ambient : 0x000000  });
		
		spriteRadius = radius ; //<== THAT is dirty . 
		return new THREE.Mesh(spriteGeom,spriteMaterial);
		
}

// a spritelight = 
// a sphere + 6 lights , each one being up / down / left / right of the sphere at same distance . 
function spritelightPosition(posX,posY,posZ) {
	sprite.position.set			(posX					,posY				,posZ				);
	spriteLight.position.set	(posX+spriteRadius*2	,posY				,posZ				);
	spriteLightb.position.set	(posX-spriteRadius*2	,posY				,posZ				);
	spriteLightc.position.set	(posX					,posY+spriteRadius*2,posZ				);
	spriteLightd.position.set	(posX					,posY-spriteRadius*2,posZ				);
	spriteLighte.position.set	(posX					,posY				,posZ+spriteRadius*2);
	spriteLightf.position.set	(posX					,posY				,posZ-spriteRadius*2);
	
}

function spritelightAdd() {
	scene.add(sprite);
	scene.add(spriteLight);
	scene.add(spriteLightb);
	scene.add(spriteLightc);
	scene.add(spriteLightd);
	scene.add(spriteLighte);
	scene.add(spriteLightf);
}