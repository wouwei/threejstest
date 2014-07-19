// GENERIC IMPLEMENTATION V2  //


/////////////////////////////////////////////////////////////////////////////////////
// this time we have : 
// - the same sprite as the last example , composed with 6 lights around a sphere .
// - a camera chasing this sprite . 
/////////////////////////////////////////////////////////////////////////////////////

////////////
// PARAMS //
////////////
//=> directories
var DIR_IMG ="assets/img/";


//=> perspective & following camera 
var ViewWidth=window.innerWidth;
var ViewHeight=window.innerHeight;
var FOV = 75;
var Distance_min = 0.1;
var Distance_max = 1000;
// this defines the camera position relative to the sprite
var CameraPositionX = 0;
var CameraPositionY = 2;
var CameraPositionZ = 6;



//=> sprite position ( in a game could be player position ) 
var spritePosX = 1
var spritePosY = 3;
var spritePosZ = -1;

// just reminders below , not needed 
//=> assets 
// texture
var grass, dirt, sky; 
// light 
var ambiantlight ;
// geometry
var Terrain, sprite;
// =>

//=> animations 
var clock,keyboard;