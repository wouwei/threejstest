
/* INIT */

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera ( 75, window.innerWidth / window.innerHeight, 0.1,1000);
var renderer = new THREE.WebGLRenderer({antialias : true});
camera.position.z = 5;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);




/* ASSETS HERE */
// cube 
var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshLambertMaterial( {color : 0x00FF00 });
var cube = new THREE.Mesh( geometry, material);
// sky
var skyboxGeometry = new THREE.CubeGeometry(100,100,100);
var skyboxMaterial = new THREE.MeshBasicMaterial({color : 0x0066FF, side : THREE.BackSide }); // by default, three draws outside surface . Here we're IN the box
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
//light
var pointLight = new THREE.PointLight(0xff6600);
pointLight.position.set(0,2,2);

/* ADDS HERE */
scene.add(cube);
scene.add(skybox);
scene.add(pointLight);

/* ANIMATIONS */
function rotate() {
	cube.rotation.x +=0.1;
	cube.rotation.y +=0.1;
}

/* LOOP LOGIC */
function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
	
	//rot
	rotate();
}

render();