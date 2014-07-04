	
	

	
//////////
// LOOP //
//////////
function animate() {
	requestAnimationFrame(animate);
	
	render();
	update();
	
}



function update() {
	
	var delta = clock.getDelta(); // seconds 
	move = 10* delta ; // 10 pixels / seconds 
	rotate = 2*Math.PI / 2 * delta ; // pi/2 radians ( 90 degrees ) / seconds 
	
	// movement  Z = front , S = back , Q = left , D = right , W = down , X = up , 
	if(keyboard.pressed("Z")) { sprite.move("Z",-move);}
	if(keyboard.pressed("S")) { sprite.move("Z",move);}
	if(keyboard.pressed("Q")) { sprite.move("X",-move);}
	if(keyboard.pressed("D")) { sprite.move("X",move);}
	if(keyboard.pressed("w")) { sprite.move("Y",-move);}
	if(keyboard.pressed("x")) { sprite.move("Y",move);}
	
	// rotation  A = rotate left , E rotate right 
	if(keyboard.pressed("A")) { sprite.rotate("X",rotate);camera.rotateOnAxis(new THREE.Vector3(0,1,0),rotate); }
	if(keyboard.pressed("E")) { sprite.rotate("X",-rotate);camera.rotateOnAxis(new THREE.Vector3(0,1,0),-rotate); }
	
	// wheelZoom with mouse 
	if(mouse.state=="wheelDown") { 	CameraPositionX =CameraPositionX*1.1;
									CameraPositionY =CameraPositionY*1.1;
									CameraPositionZ =CameraPositionZ*1.1;
									mouse.state =-1;}
	if(mouse.state=="wheelUp") { 	CameraPositionX =CameraPositionX*0.9;
									CameraPositionY =CameraPositionY*0.9;
									CameraPositionZ =CameraPositionZ*0.9;
									mouse.state =-1;}
									
									
	
	//buttonright clicked  with mouse, XZ plane rotation : move = eventX - mouse.posX; negative means move left, positive means move right 
	
	if(mouse.state=="buttonRight") { 
			
			if(mouse.moveX < 0 ) {
					sprite.rotate("X",rotate);
					camera.rotateOnAxis(new THREE.Vector3(0,1,0),rotate);
					
				}
			else if(mouse.moveX > 0) {
					sprite.rotate("X",-rotate);
					camera.rotateOnAxis(new THREE.Vector3(0,1,0),-rotate);
			}
			mouse.moveX = 0;
		}
	
	
	
	
	// camera repositionning 
	
	var relativeCameraOffset = new THREE.Vector3(CameraPositionX,CameraPositionY,CameraPositionZ); // this is the relative position of the camera regaring the sprite
	var cameraOffset = relativeCameraOffset.applyMatrix4( sprite.object[0].matrixWorld );
	camera.position = cameraOffset;
	camera.lookAt(sprite.object[0].position); // disable this line to have a "sick motion" cam ... 
	stats.update();
}

function render() {
		renderer.render(scene,camera);
	}



