// GENERIC IMPLEMENTATION V2  //


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