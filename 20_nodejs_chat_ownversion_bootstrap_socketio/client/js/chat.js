
$(document).ready(function(){
	// default 
	var socket = io.connect('127.0.0.1:8080');
	var ready,name;
	$("#chat").hide();
	$("#name").focus();
	
	// join
	$("#join").click(function(){
			name=$("#name").val();
			
			if(name!="") {
				socket.emit("join",name);
				$("#login").hide();
				$("#chat").show();
				$("#msg").focus();
				ready=true;
			}
		});	
	
		
	$("#name").keypress(function(e) {

			if(e.which == 13) { 
					e.preventDefault();
					name=$("#name").val();
					
					if(name!="") { 
						socket.emit("join",name);
						$("#login").hide();
						$("#chat").show();
						$("#msg").focus();
						ready=true;
					}
				}
		});
	

	// send msg 
	$("#send").click(function() {
			message =$("#msg").val();
			if(message !="") {
					socket.emit("send",message);
				}
			$("#msg").val("");
		});
	
	$("#msg").keypress(function(e){
			if(e.which == 13) {
					e.preventDefault();			
					message=$("#msg").val();
					if(message!="") {
							socket.emit("send",message);
						}
						
					$("#msg").val("");
				}
		});
	
	// logout
	$("#logout").click(function() {
		$("#chat").hide();
		$("#login").show();
		$("#name").focus();
		socket.emit("leave");
	});
	
	
	
	// server feedbadk
	socket.on("update-users",function(users) {
			if(ready==true) { 	$("#people").empty();
								$.each(users,function(clientid,name){$('#people').append("<br/>"+name);});
							}
		});
		
	socket.on("update",function(msg) {
			if(ready==true) {	$("#talkboard").append("<br/>" + msg );}
		});
	
	});