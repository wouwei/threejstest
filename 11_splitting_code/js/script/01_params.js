// GENERIC IMPLEMENTATION V2  //

////////////
// PARAMS //
////////////
//=> directories
var DIR_IMG ="assets/img/";


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

