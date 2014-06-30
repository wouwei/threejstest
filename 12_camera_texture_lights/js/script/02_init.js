// GENERIC IMPLEMENTATION V2  //


//////////
// INIT //
//////////
function init() {
		// declaring
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera ( FOV,ViewWidth / ViewHeight, Distance_min,Distance_max);
		renderer = new THREE.WebGLRenderer ({antialias: false});
		controls = new THREE.OrbitControls(camera);
		stats = new Stats(); // FPS
		
		// init
		camera.position.set(CamX,CamY,CamZ);
		/* 
			CAMERA LOOKING AT ISSUES WITH OrbitControls . 
			by default, to point the camera somewhere , you can do camera.lookat(vector3);
			OR
			
			the OrbitControls version in this example overrides the default camera lookAt()
			on line 017 : OrbitControls.center is defined . 
			on line 190 : here is the override 
			
			SO
			while using this file OrbitControls, you need to define the orbitcontrols center. 
		*/
		controls.center =new THREE.Vector3(CamLookX,CamLookY,CamLookZ);
		
		
		controls.addEventListener('change',render);
		renderer.setSize(ViewWidth,ViewHeight);
		document.body.appendChild(renderer.domElement);
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.zIndex = 100;
		document.body.appendChild( stats.domElement );
	}