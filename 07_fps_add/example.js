// TRYING TO GO ON GENERIC DEFINITION HERE //

////////////
// PARAMS //
////////////
//=> camera 
var ViewWidth=window.innerWidth;
var ViewHeight=window.innerHeight;
var CamX = 10;
var CamY = 10;
var CamZ = 25;
var FOV = 75;
var Distance_min = 0.1;
var Distance_max = 1000;

//=> init
var scene,camera,controls,renderer,stat;
//=> textures
var grass,dirt;
//=> geometry
var cube,bigcube;
var bigcubeVertice=40; //  number of little cubes in a bigcube vertice .
//=> light
var light;

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
		
		// geometry 
		cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1));
		bigcube = new THREE.Geometry();

	}

// POSITIONNING	and scene add
function positionning() {
		// light
		light.position.set(25,8,16);
		scene.add(light);
		
		// geometry
		for (var i =0;i<bigcubeVertice;i++) {
			for(var j=0; j<bigcubeVertice;j++) {
				for (var k=0; k<bigcubeVertice;k++) {
					cube.position.set(i*2,j*2,k*2);
					THREE.GeometryUtils.merge(bigcube,cube);
				}
			}
		}
		
		scene.add(new THREE.Mesh( bigcube,grass));
		
		
		
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
	return new THREE.MeshLambertMaterial ({map : Texture});
}


