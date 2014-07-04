// GENERIC IMPLEMENTATION V2  //


//////////
// INIT //
//////////
function init() {
		// declaring
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera ( FOV,ViewWidth / ViewHeight, Distance_min,Distance_max);
		renderer = new THREE.WebGLRenderer ({antialias: false});
		stats = new Stats(); // FPS
		clock = new THREE.Clock();
		keyboard = new THREEx.KeyboardState();
		mouse = new mouseState();
		
		// init
		renderer.setSize(ViewWidth,ViewHeight);
		document.body.appendChild(renderer.domElement);
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.zIndex = 100;
		document.body.appendChild( stats.domElement );
	}