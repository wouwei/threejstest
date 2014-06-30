// GENERIC IMPLEMENTATION V2  //

//=> special geometry functions here 
// please refer to the notes line 130 > example.js > 09_buffering_8_primitives_stepbystep
// if you want to understand the logic of this function 
function surface(height){
		
		var geometry = new THREE.BufferGeometry();
		var surfaceX = height[0].length;
		var x=0;
		var surfaceZ = height.length;
		var z=0;
		
		var vertexIndex = 18*(surfaceX-1)*(surfaceZ-1);
		var uvIndex = 12*(surfaceX-1)*(surfaceZ-1);
		
		geometry.addAttribute('position',new Float32Array(vertexIndex),3); 
		geometry.addAttribute('uv', new Float32Array(uvIndex),2);
		positions = geometry.getAttribute('position').array;
		uvs = geometry.getAttribute('uv').array;
		
		
		for(i=0;i<vertexIndex;i=i+18) 
			{
				positions[i]=positions[i+3]=positions[i+12]=x;
				positions[i+9]=positions[i+15]=positions[i+6]=x+1;
				
				positions[i+2]=positions[i+8]=positions[i+11]=-z;
				positions[i+5]=positions[i+14]=positions[i+17]=-(z+1);
				
				positions[i+1]=height[z][x];
				positions[i+16]=height[z+1][x+1];
				positions[i+4]=positions[i+13]=height[z+1][x];
				positions[i+7]=positions[i+10]=height[z][x+1];
				
				if(x<surfaceX-2) { x++; }
				else { x=0; z++; }
				
			}
		
		//=> uvs
		for(i=0;i<uvIndex;i=i+12)
			{
			uvs[i+0]=uvs[i+1]=uvs[i+2]=uvs[i+5]=uvs[i+6]=uvs[i+9]=uvs[i+10]=uvs[i+11]=0;
			uvs[i+3]=uvs[i+4]=uvs[i+7]=uvs[i+8]=1;
			}
		
		// optimisation 
		geometry.computeVertexNormals();	
		
		//=> final mesh
		return new THREE.Mesh( geometry, grass );
	}
	