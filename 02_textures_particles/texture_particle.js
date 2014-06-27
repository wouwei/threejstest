
/* INIT */

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera ( 75, window.innerWidth / window.innerHeight, 0.1,1000);
var renderer = new THREE.WebGLRenderer({antialias : true});
camera.position.z = 15;
camera.position.y = 2;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);




/* ASSETS HERE */
// cube 
var geometry = new THREE.CubeGeometry(1,1,1);
var texture = new THREE.ImageUtils.loadTexture('grass_temperate.png');
var material = new THREE.MeshLambertMaterial( {map: texture, color: 0x00FF66});
var cube = new THREE.Mesh( geometry, material);
// sky
var skyboxGeometry = new THREE.CubeGeometry(100,100,100);
var skyboxMaterial = new THREE.MeshBasicMaterial({color : 0x0066FF, side : THREE.BackSide }); // by default, three draws outside surface . Here we're IN the box
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
//light
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2,2,2);
//particles
var particles = new THREE.Geometry;

for(var p = 0; p < 10; p++) {
	var particle = new THREE.Vector3(Math.random()*10-5,Math.random()*10-5,Math.random()*10-5);
	particles.vertices.push(particle);
	}
var particleMaterial = new THREE.ParticleBasicMaterial( { color : 0xff6600, size: 1 });
var particleSystem = new THREE.ParticleSystem(particles, particleMaterial);	

/* ADDS HERE */
scene.add(cube);
scene.add(skybox);
scene.add(pointLight);
scene.add(particleSystem);

/* ANIMATIONS */
function rotate() {
	cube.rotation.x +=0.1;
	cube.rotation.y +=0.1;
	particleSystem.rotation.y +=0.1
}

/* LOOP LOGIC */
function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
	
	//rot
	rotate();
}

render();