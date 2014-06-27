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
cube1.position.set(0,2,-1);
cube2.position.set(1,2,-1);

cube3 = cube1.clone();
cube4 = cube1.clone();

cube3.position.set(3,2,-1);
cube4.position.set(4,2,-1);

var geometry = new THREE.Geometry();
THREE.GeometryUtils.merge(geometry,cube3);
THREE.GeometryUtils.merge(geometry,cube4);
var NewObject = new THREE.Mesh(geometry,grass);
	
//==> light
var pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(5,4,1);


/* ADDS HERE */
scene.add(pointlight);
scene.add(cube1);
scene.add(cube2);
//scene.add(cube3);
//scene.add(cube4);
scene.add(NewObject);

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






