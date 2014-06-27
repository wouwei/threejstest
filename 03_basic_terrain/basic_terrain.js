/* INIT */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera ( 75,window.innerWidth / window.innerHeight, 0.1,1000);
var renderer = new THREE.WebGLRenderer ({antialias: true});
camera.position.z = 5;
camera.position.y = 4;
camera.position.x = 4;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* ASSETS */
//==> material
var grass = LoadMaterial('grass_temperate.png');
var dirt = LoadMaterial('dirt_temperate.png');

//==> geometry 
var cube1 = CreateGeometry(1,1,1,grass);
var cube2 = CreateGeometry(1,1,1,dirt);

// ==> terrain 
// x, y 2D coordinates . filling with height . terrain[x][z]=y
x=10;
z=10;
var terrain = new Array(x);
for(var i=0; i<x; i++) {
		terrain[i]=new Array(z);
		for(var j=0; j<z; j++){
			terrain[i][j]=Math.floor(Math.random()*6);
		}
	}

var TerrainCube = new Array(x*z);
var i=0;
var j=0;

for(var k=0;k<(x*z);k++){
		
		TerrainCube[k]=(terrain[i][j]<3)?cube2.clone():cube1.clone();
		TerrainCube[k].position.set(i,terrain[i][j],-j);
		scene.add(TerrainCube[k]);
		
		if(j<(x-1)) { j++; }
		else { j=0; i++;}
		
	}
	
//var cube3 = cube2.clone();
cube2.position.set(1,0,-1);
//cube3.position.set(2,0,0);

//==> light
var pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(2,2,0);


/* ADDS HERE */
scene.add(cube1);
scene.add(cube2);
//scene.add(cube3);
scene.add(pointlight);
/* LOOP */
function render() {
		requestAnimationFrame(render);
		renderer.render(scene,camera);
	}
	
render();


/* FUNCTIONS */
function LoadMaterial(TexturePath) {
	var Texture = new THREE.ImageUtils.loadTexture(TexturePath);
	return new THREE.MeshLambertMaterial ({map : Texture,color : 0xeeeeee});
}

function CreateGeometry(x,y,z,texture) {
	var Geometry = new THREE.CubeGeometry(x,y,z);
	return new THREE.Mesh(Geometry,texture);
}






