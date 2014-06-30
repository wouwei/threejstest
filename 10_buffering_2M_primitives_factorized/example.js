// GENERIC IMPLEMENTATION V1  //

////////////
// PARAMS //
////////////
//=> camera 
var ViewWidth=window.innerWidth;
var ViewHeight=window.innerHeight;
var CamX = 1;
var CamY = 3;
var CamZ = 3;
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
		//=> textures
		grass = LoadMaterial('grass_temperate.png');
		dirt = LoadMaterial('dirt_temperate.png');
		
		//=> lights
		light = new THREE.PointLight(0xffffff);
		ambiantlight = new THREE.AmbientLight(0x444444);
		
		//=> geometries
		// simple control cube 
		/*
		var cubeGeom = new THREE.BoxGeometry(1,1,1);
		cube = new THREE.Mesh(cubeGeom,grass);
		cube.position.set(-1,0,0);
		*/
		
		// a simple triangle .
		
		// making the basic surface ( triangle ) .
		TerrainHeight = randArray(1000,1000,0,4);
		Terrain = surface(TerrainHeight);
		
	}

//=> special geometry functions here 
// please refer to the notes line 130 > example.js > 09_buffering_8_primitives_stepbystep
// if you want to understand the logic of this function 
function surface(height){
		
		var geometry = new THREE.BufferGeometry();
		var surfaceX = height[0].length;
		var x=0;
		var surfaceZ = height.length;
		var z=0;
		
		var vertexIndex = 18*(surfaceX-1)*(surfaceZ-1);
		var uvIndex = 12*(surfaceX-1)*(surfaceZ-1);
		
		geometry.addAttribute('position',new Float32Array(vertexIndex),3); 
		geometry.addAttribute('uv', new Float32Array(uvIndex),2);
		positions = geometry.getAttribute('position').array;
		uvs = geometry.getAttribute('uv').array;
		
		
		for(i=0;i<vertexIndex;i=i+18) 
			{
				positions[i]=positions[i+3]=positions[i+12]=x;
				positions[i+9]=positions[i+15]=positions[i+6]=x+1;
				
				positions[i+2]=positions[i+8]=positions[i+11]=-z;
				positions[i+5]=positions[i+14]=positions[i+17]=-(z+1);
				
				positions[i+1]=height[z][x];
				positions[i+16]=height[z+1][x+1];
				positions[i+4]=positions[i+13]=height[z+1][x];
				positions[i+7]=positions[i+10]=height[z][x+1];
				
				if(x<surfaceX-2) { x++; }
				else { x=0; z++; }
				
			}
		
		//=> uvs
		for(i=0;i<uvIndex;i=i+12)
			{
			uvs[i+0]=uvs[i+1]=uvs[i+2]=uvs[i+5]=uvs[i+6]=uvs[i+9]=uvs[i+10]=uvs[i+11]=0;
			uvs[i+3]=uvs[i+4]=uvs[i+7]=uvs[i+8]=1;
			}
		
		// optimisation 
		geometry.computeVertexNormals();	
		
		//=> final mesh
		return new THREE.Mesh( geometry, grass );
	}
	
//=> making a full random array
// height = number of columns
// width = number of rows 
// min = minimum value
// MAX = maximum value .
function randArray(height,width,min,MAX) {
	square = new Array(height);
	for(i=0;i<height;i++) {
		square[i]=new Array(width);
		for(j=0;j<width;j++) {
			square[i][j]=Math.floor(Math.random()*MAX)+min;
		}
	}
	return square;
}
	
//=> texture functions here 
function LoadMaterial(TexturePath) {
	var Texture = new THREE.ImageUtils.loadTexture(TexturePath);
	return new THREE.MeshPhongMaterial ({	map : Texture,
											side: THREE.DoubleSide,
											bumpMap : Texture,
											bumpScale : 0.1,
											color : 0xaaaaaa });
}
	
	
	
// POSITIONNING	and scene add
function positionning() {
		// light
		light.position.set(1,3,2);
		scene.add(light);
		scene.add(ambiantlight);
		// geometry
		scene.add( Terrain );
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
	render();
	controls.update();
	stats.update();
}




