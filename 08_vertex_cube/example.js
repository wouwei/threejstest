// GENERIC IMPLEMENTATION V1  //

////////////
// PARAMS //
////////////
//=> camera 
var ViewWidth=window.innerWidth;
var ViewHeight=window.innerHeight;
var CamX = 1;
var CamY = 1;
var CamZ = 1;
var FOV = 75;
var Distance_min = 0.1;
var Distance_max = 1000;

//=> init
var scene,camera,controls,renderer,stat;
//=> textures
var grass,dirt;
//=> geometry
var meshtest, cube;
var positions,uvs;
//=> light
var light,ambiantlight;

///////////
// LOGIC //
///////////
init();
assets();
positionning();
animate();





//////////
// INIT //
//////////
function init() {
		// declaring
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera ( FOV,ViewWidth / ViewHeight, Distance_min,Distance_max);
		controls = new THREE.OrbitControls(camera);
		renderer = new THREE.WebGLRenderer ({antialias: false});
		stats = new Stats(); // FPS
		
		// init
		camera.position.set(CamX,CamY,CamZ);
		controls.addEventListener('change',render);
		renderer.setSize(ViewWidth,ViewHeight);
		document.body.appendChild(renderer.domElement);
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.zIndex = 100;
		document.body.appendChild( stats.domElement );
	}

////////////	
// ASSETS //	
////////////
function assets() {
		// textures
		grass = LoadMaterial('grass_temperate.png');
		dirt = LoadMaterial('dirt_temperate.png');
		
		// light
		light = new THREE.PointLight(0xffffff);
		ambiantlight = new THREE.AmbientLight(0x444444);
		// geometry 
		// basic test cube 
		var cubeGeom = new THREE.BoxGeometry(1,1,1);
		cube = new THREE.Mesh(cubeGeom,grass);
		cube.position.set(-1,0,0);
		
		
		// making the basic surface ( triangle ) .  
		var geometry = new THREE.BufferGeometry();

		geometry.addAttribute('position',new Float32Array(3*3),3); // (x,y,z) or 3 infos per vertices . 1 triangle = 3 vertices , 3 positions
		geometry.addAttribute('uv', new Float32Array(3*2),2); // Texture 2D(x,y) , 3 vertices . So UV = 3 vertices X 2 2D coordinates = 6 
		positions = geometry.getAttribute('position').array;
		uvs = geometry.getAttribute('uv').array;
		
		
		//=> positions 
		//defining vertices 
		var ax = 0, bx = 0, cx= 1;		positions[0]=ax;	positions[3]=bx;	positions[6]=cx;
		var ay = 0, by = 1, cy= 0;		positions[1]=ay;	positions[4]=by;	positions[7]=cy;
		var az = 0, bz = 0, cz= 0;		positions[2]=az;	positions[5]=bz;	positions[8]=cz;
		
		//=> uvs
		uvs[0]=0;			uvs[2]=0;			uvs[4]=1;
		uvs[1]=0;			uvs[3]=1;			uvs[5]=0;
			
		// optimisation possibilities.
		geometry.computeVertexNormals();	
		
		//=> final mesh
		meshtest = new THREE.Mesh( geometry, grass );
		
	}

// POSITIONNING	and scene add
function positionning() {
		// light
		light.position.set(1,1,2);
		scene.add(light);
		scene.add(ambiantlight);
		// geometry
		scene.add( meshtest );
		scene.add(cube);
		
		
		
		
}
	
//////////
// LOOP //
//////////
function render() {
		renderer.render(scene,camera);
	}
	

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	render();
	stats.update();
}



////////////////////
// MISC FUNCTIONS //
////////////////////
function LoadMaterial(TexturePath) {
	var Texture = new THREE.ImageUtils.loadTexture(TexturePath);
	return new THREE.MeshPhongMaterial ({	map : Texture,
											side: THREE.DoubleSide,
											bumpMap : Texture,
											bumpScale : 0.1,
											color : 0xaaaaaa });
}


