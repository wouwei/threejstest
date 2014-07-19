// GENERIC IMPLEMENTATION V2  //
// author : wouwei 
// git : https://github.com/wouwei/threejstest 


// need to normalize IE / opera / firefox / chrome . 
// testing for now in firefox .


var mouseState = function() {
		/////////
		// VAR //
		/////////
		this.mouseAlias = {	'buttonLeft' : 0,
							'wheel' : 1,
							'buttonRight' : 2,
							'wheelDown' : 3,
							'wheelUp' : -3};	
		this.state = -1;
		var mouseStateObject = this ; // reference to the object instancied . 
		this.posX = 0;// mouse position 
		this.posY = 0;// mouse position 
		this.moveX = 0; // mouse movement on X axis
		this.moveY = 0; // mouve movement on Y axis 
		//=>functions
		this.alias = alias; 
		this.mousemove = mousemove ;
		
		////////////////////						
		// event binding  //					
		////////////////////
		//=> triggering mouseclick capture
		document.onmousedown = function(event)
			{
				
				mouseStateObject.state = mouseStateObject.alias(event);
				
				
			}
		
		
		document.onmousemove = function (event) {
			mouseStateObject.mousemove(event);
			event.stopPropagation();
		}
		
		
		//=> cancelling the state after mouseclick .
		document.onmouseup = function(event)	{mouseStateObject.state = -1;}
		
		
		
		//=> dealing with mouse wheel
		document.onwheel = function(event) 
			{
				mouseStateObject.state = mouseStateObject.alias(event);
			}
			
		document.oncontextmenu = function(event) { event.preventDefault();}	
		
		
		///////////////	
		// functions //
		///////////////
		//=> Alias 	
		// return the key alias of a pressed button . 
		// event = the mouse event 
		// mouseAlias = implicit used variable ( defined in the first lines )
		function alias(event) {
			
			value = (event.deltaY == undefined ) ? event.button:event.deltaY;
			for(var key in this.mouseAlias) {
				if(this.mouseAlias[key]==value) {
					return key ;
				}
			}
		}
		
		//=> detectecting movement of the mouse on X axis . ( 2D ) . 
		function mousemove(event) {
			
			this.moveX = event.pageX - this.posX;
			this.moveY = event.pageY - this.posY;
			this.posX = event.pageX;
			this.posY = event.pageY;
			
		}
	}
	
mouseState.prototype;	
