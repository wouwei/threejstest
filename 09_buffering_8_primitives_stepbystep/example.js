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
		TerrainHeight = randArray(3,3,0,2);
		Terrain = surface(TerrainHeight);
		
	}

//=> special geometry functions here 
function surface(height){
		// making the basic surface ( triangle ) .  
		var geometry = new THREE.BufferGeometry();
		
		geometry.addAttribute('position',new Float32Array(72),3); 
		geometry.addAttribute('uv', new Float32Array(48),2);
		positions = geometry.getAttribute('position').array;
		uvs = geometry.getAttribute('uv').array;
		
		//positions , defining vertices 
		// here is a manually written 3X3 " surface " . Just to find the patterns and to understand how it works . 
		//
		// each lines below is a vertex coordinate (x,y,z ) .
		//               Y  -Z
		//               ! /	
		//               !/
		//               ---> X  ( note on 3D coordinates in three.js ) .
		
		// so basically if we work on a " terrain " Y would be height .
		// the height array (3X3) in this example contains randomized values between 0 and 2 
		// To render i thought with square . a square is 2 triangles . 
		// if we project the 3D coordinates in a 2D plan , we have :
		// y=f(x,z)        HERE            y=height[z][x]
		//
		//      (0,-1) *********** (1,-1)
		//             *         *
		//             *         *
		//       (0,0) *********** (1,0) 
		//
		// to read next 6 line projected on the square above:
		// triangle 1 :
		// line 1 : (0,0)         *
		// line 2 : (0,-1)  ==>   * *
		// line 3 : (1,0)         ****
		//triangle 2 :
		// line 4 : (1,0)          ****
		// line 5 : (0,-1)  ==>     * *
		// line 6 : (1,-1)            *
		
		

																		// this is notes for the next test_10_buffering_2K_primitives_factorized
		positions[0]=0;positions[1]=height[0][0];positions[2]=0;       	// positions[i   ]=x  ;positions[i+ 1]=height[z  ][x  ];positions[i+ 2]=-(z  );
		positions[3]=0;positions[4]=height[1][0];positions[5]=-1;		// positions[i+ 3]=x  ;positions[i+ 4]=height[z+1][x  ];positions[i+ 5]=-(z+1);
		positions[6]=1;positions[7]=height[0][1];positions[8]=0;		// positions[i+ 6]=x  ;positions[i+ 7]=height[z  ][x+1];positions[i+ 8]=-(z  );
		
		positions[9]=1;positions[10]=height[0][1];positions[11]=0;		// positions[i+ 9]=x+1;positions[i+10]=height[z  ][x+1];positions[i+11]=-(z  );
		positions[12]=0;positions[13]=height[1][0];positions[14]=-1;	// positions[i+12]=x  ;positions[i+13]=height[z+1][x  ];positions[i+14]=-(z+1);
		positions[15]=1;positions[16]=height[1][1];positions[17]=-1;	// positions[i+15]=x+1;positions[i+16]=height[z+1][x+1];positions[i+17]=-(z+1);

		positions[18]=1;positions[19]=height[0][1];positions[20]=0;		// which would give :
		positions[21]=1;positions[22]=height[1][1];positions[23]=-1;	// positions[i]=positions[i+3]=positions[i+6]=positions[i+12]=x;
		positions[24]=2;positions[25]=height[0][2];positions[26]=0;		// positions[i+9]=positions[i+15]=x+1;
																		// 
		positions[27]=2;positions[28]=height[0][2];positions[29]=0;		// positions[i+2]=positions[i+8]=positions[i+11]=-z;
		positions[30]=1;positions[31]=height[1][1];positions[32]=-1;	// positions[i+5]=positions[i+14]=positions[i+17]=-(z+1);
		positions[33]=2;positions[34]=height[1][2];positions[35]=-1;	//
																		// positions[i+1]=height[z][x];
		positions[36]=0;positions[37]=height[1][0];positions[38]=-1;	// positions[i+16]=height[z+1][x+1];
		positions[39]=0;positions[40]=height[2][0];positions[41]=-2;	// positions[i+4]=positions[i+13]=height[z+1][x];
		positions[42]=1;positions[43]=height[1][1];positions[44]=-1;	// positions[i+7]=positions[i+10]=height[z][x+1];
																		//	
		positions[45]=1;positions[46]=height[1][1];positions[47]=-1;	// i = number of spatial coordinates = 3 per vertexes
		positions[48]=0;positions[49]=height[2][0];positions[50]=-2;	// vertexes = 3 per triangles
		positions[51]=1;positions[52]=height[2][1];positions[53]=-2;	// triangles =2 per square 
																		// square = (surface.width-1)*(surface.height-1)  // surface.width = x, surface.height = z
		positions[54]=1;positions[55]=height[1][1];positions[56]=-1;	// square = (x-1)*(z-1) 
		positions[57]=1;positions[58]=height[2][1];positions[59]=-2;	// i=3*3*2*(x-1)*(z-1)                    
		positions[60]=2;positions[61]=height[1][2];positions[62]=-1;	// i=18*(x-1)(z-1) 
																		// test here : x=3, z=3 so i=72 which is correct in this example .				
		positions[63]=2;positions[64]=height[1][2];positions[65]=-1;
		positions[66]=1;positions[67]=height[2][1];positions[68]=-2;
		positions[69]=2;positions[70]=height[2][2];positions[71]=-2;
		
		
		//=> uvs
		uvs[0]=0;			uvs[2]=0;			uvs[4]=1;
		uvs[1]=0;			uvs[3]=1;			uvs[5]=0;
		
		uvs[6]=0;			uvs[8]=1;			uvs[10]=0;
		uvs[7]=1;			uvs[9]=0;			uvs[11]=0;
		
		uvs[12]=0;			uvs[14]=0;			uvs[16]=1;
		uvs[13]=0;			uvs[15]=1;			uvs[17]=0;
		
		uvs[18]=0;			uvs[20]=1;			uvs[22]=0;
		uvs[19]=1;			uvs[21]=0;			uvs[23]=0;
		
		uvs[24]=0;			uvs[26]=0;			uvs[28]=1;
		uvs[25]=0;			uvs[27]=1;			uvs[29]=0;
		
		uvs[30]=0;			uvs[32]=1;			uvs[34]=0;
		uvs[31]=1;			uvs[33]=0;			uvs[35]=0;
		
		uvs[36]=0;			uvs[38]=0;			uvs[40]=1;
		uvs[37]=0;			uvs[39]=1;			uvs[41]=0;
		
		uvs[42]=0;			uvs[44]=1;			uvs[46]=0;
		uvs[43]=1;			uvs[45]=0;			uvs[47]=0;
		
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
	controls.update();
	render();
	stats.update();
}




