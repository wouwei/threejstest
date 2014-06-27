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
// x, z 2D coordinates . filling with "y" height . terrain[x][z]=y
// here the algorythm would be : the height could not be greater than the matrix line OR greater than the object distance to the camera . 
// It makes a hilly screen .
//random
x=21;
y=21;
z=21;
var yLimit;
var terrain = [];
for(var i=0; i<x; i++) {
		terrain[i]=[];
		for(var j=0; j<z; j++){
			yLimit=((j+2)<y)?(j+2):y;
			terrain[i][j]=Math.floor(Math.random()*yLimit);
		}
	}

// rendering
var TerrainCube= [];
var i=0;
var j=0;


for(var l=0;l<y+1;l++) {
		for(var k=0;k<(x*z);k++) {
			if(terrain[i][j]>(l-1))
				{
					TerrainCube[k]=(l<5)?cube2.clone():cube1.clone();
					TerrainCube[k].position.set(i,l,-j);
					scene.add(TerrainCube[k]);
				}
			
			
			if(j<(x-1)) { j++; }
				else { j=0; i++;}
		}
		j=0;
		i=0;
	}

	
//==> light
var pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(5,4,1);


/* ADDS HERE */

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






