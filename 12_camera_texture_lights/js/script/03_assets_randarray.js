// GENERIC IMPLEMENTATION V2  //

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