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
		dirt = LoadMaterial(DIR_IMG+'dirt_temperate.png');
		
		//=> lights
		light = new THREE.PointLight(0xffffff);
		ambiantlight = new THREE.AmbientLight(0x444444);
		
		//=> geometries
		// making a basic surface with triangle.
		TerrainHeight = randArray(100,100,0,4);
		Terrain = surface(TerrainHeight);
		
		//=>computing
		positionning();
		sceneAdd();
		
	}

function positionning() {
	//=>lights
	light.position.set(1,3,2);
}

function sceneAdd() {
	//=>lights
	scene.add(light);
	scene.add(ambiantlight);
	
	//geometry
	scene.add(Terrain);
	
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
											color : 0xaaaaaa });
}