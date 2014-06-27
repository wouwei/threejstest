/* INIT */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera ( 75,window.innerWidth / window.innerHeight, 0.1,1000);
var controls = new THREE.OrbitControls(camera);
var renderer = new THREE.WebGLRenderer ({antialias: false});
camera.position.x = 25;
camera.position.y = 4;
camera.position.z = 15;
controls.addEventListener('change',render);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



/* ASSETS */
//==> material
var grass = LoadMaterial('grass_temperate.png');
var dirt = LoadMaterial('dirt_temperate.png');

//==> geometry 
var dirt_geometry = new THREE.Geometry();
var grass_geometry = new THREE.Geometry();
var oneCube = new THREE.BoxGeometry(1,1,1);
var MeshCube = new THREE.Mesh(oneCube);



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
var i=0;
var j=0;

// preparing merging .
for(var l=0;l<y+1;l++) {
		for(var k=0;k<(x*z);k++) {
			if(terrain[i][j]>(l-1))
				{
					MeshCube.position.set(i,l,-j);
					// merging 
					var which_geometry=(l<5)?dirt_geometry:grass_geometry;
					THREE.GeometryUtils.merge(which_geometry,MeshCube);
					
				}
			
			
			if(j<(x-1)) { j++; }
				else { j=0; i++;}
		}
		j=0;
		i=0;
	}

// adding texture 
var dirt_Object = new THREE.Mesh(dirt_geometry,dirt);
var grass_Object = new THREE.Mesh(grass_geometry,grass);	

	
//==> light
var pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(25,8,16);


/* SCENE ADDS HERE */
scene.add(pointlight);
scene.add(dirt_Object);
scene.add(grass_Object);

/* LOOP */
function render() {
		requestAnimationFrame(render);
		renderer.render(scene,camera);
		
	}
	
render();
animate();

/* FUNCTIONS */
function LoadMaterial(TexturePath) {
	var Texture = new THREE.ImageUtils.loadTexture(TexturePath);
	return new THREE.MeshLambertMaterial ({map : Texture,color : 0xeeeeee});
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
}





