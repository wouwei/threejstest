	
	

	
//////////
// LOOP //
//////////
function render() {
		renderer.render(scene,camera);
	}
	

function animate() {
	requestAnimationFrame(animate);
	render();
	controls.update();
	stats.update();
}




