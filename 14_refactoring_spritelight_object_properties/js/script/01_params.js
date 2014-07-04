// GENERIC IMPLEMENTATION V2  //

////////////
// PARAMS //
////////////
//=> directories
var DIR_IMG ="assets/img/";


//=> perspective camera 
var ViewWidth=window.innerWidth;
var ViewHeight=window.innerHeight;
var CamX = 10;
var CamY = 10;
var CamZ = 10;
var CamLookX =20 ;
var CamLookY =0 ;
var CamLookZ =-20 ;
var FOV = 75;
var Distance_min = 0.1;
var Distance_max = 1000;

// just reminders below , not needed 
//=> assets 
// texture
var grass, dirt; 
// light 
var spriteLight, ambiantlight ;
// geometry
var Terrain, sprite;

//=> animations 
var clock,keyboard;