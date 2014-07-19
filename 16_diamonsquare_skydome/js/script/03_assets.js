// GENERIC IMPLEMENTATION V2  //

/*
	NOTE : i splitted the different functions in the geometries part . 
	not that those functions are really heavy and requires a lot of lines . 
	I could have written those functions just below , 
	but i want to try the readability and the understanding of the code on a more heavier solution . 
*/



////////////	
// ASSETS //	
////////////
function assets() {
		//=> textures
		grass = LoadMaterial(DIR_IMG+'grass_temperate.png');
		sky = LoadMaterial(DIR_IMG+'sky.jpg');
		
		//=> lights
		ambiantlight = new THREE.AmbientLight(0xffffff);
		
		//=> surface
		TerrainHeight = diamonsquare(128,0,20,0.75);
		Terrain = surface(TerrainHeight);
		
		//=> player :  spritelight (geometry + light)  
		sprite = new spritelight();
		sprite.geometry(0.5,32,16,0xff6600);
		
		//=> sky
		skyGeom = new THREE.SphereGeometry(100,100,100); 
		skyDome = new THREE.Mesh(skyGeom,sky);
		//=>computing
		positionning();
		sceneAdd();
	}

	
//=> positionning	
function positionning() {
	//=> geometries
	sprite.position(64,TerrainHeight[64][64]+3,-64);
	skyDome.position.set(64,0,-64);
}


//=> adding to the scene 
function sceneAdd() {
	//lights
	scene.add(ambiantlight);
	
	//geometry
	scene.add(Terrain);
	scene.add(skyDome);
	sprite.sceneAdd();
	
	
}	
	

////////////////////	
// MISC FUNCTIONS // 
////////////////////

//=> Load material ( phong based ) .
function LoadMaterial(TexturePath) {
	var Texture = new THREE.ImageUtils.loadTexture(TexturePath);
	return new THREE.MeshPhongMaterial ({	map : Texture,
											side: THREE.DoubleSide,
											bumpMap : Texture,
											bumpScale : 0.1,
											color : 0xffffff });
}
