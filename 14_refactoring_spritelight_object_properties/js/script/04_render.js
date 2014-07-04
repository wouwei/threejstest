	
	

	
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
	rotate = Math.PI / 2 * delta ; // pi/2 radians ( 90 degrees ) / seconds 
	
	// movement  Z = front , S = back , Q = left , D = right , W = down , X = up , 
	if(keyboard.pressed("Z")) { sprite.move("Z",-move); }
	if(keyboard.pressed("S")) { sprite.move("Z",move); }
	if(keyboard.pressed("Q")) { sprite.move("X",-move); }
	if(keyboard.pressed("D")) { sprite.move("X",move); }
	if(keyboard.pressed("w")) { sprite.move("Y",-move); }
	if(keyboard.pressed("x")) { sprite.move("Y",move); }
	
	// rotation  A = rotate left , E rotate right 
	if(keyboard.pressed("A")) { sprite.rotate("X",rotate); }
	if(keyboard.pressed("E")) { sprite.rotate("X",-rotate); }
	
	
	controls.update();
	stats.update();
}

function render() {
		renderer.render(scene,camera);
	}



