// GENERIC IMPLEMENTATION V2  //

//=> making a diamonsquare 
// concept : http://www.paulboxley.com/blog/2011/03/terrain-generation-mark-one
// side : can only be 2^n number.
// min = minimum value
// MAX = maximum value .
// noise = random add in the middle of a diamond .

function diamonsquare(side,min,MAX,noise) {
		// var
		var square=new Array(side+1);
		for(i=0;i<square.length;i++)
			{
				square[i] = new Array(side+1);
			}
		
		
		var i = j = 0;
		var k = l =  side;
		
														//			 (k/2,l)
		// randomize corners 							//    (i,l)	*---*---* (k,l)
		square[i][j]=Math.round(Math.random()*MAX)+min; //			!	!	!
		square[i][l]=Math.round(Math.random()*MAX)+min; //	 (i,l/2)*---*---*  (k,l/2)
		square[k][j]=Math.round(Math.random()*MAX)+min; //			!	!	!
		square[k][l]=Math.round(Math.random()*MAX)+min; //    (i,j)	*---*---*  (k,j)
														//            (k/2,j)
		
		// center 
		square[k/2][l/2]=Math.round((square[0][0]+square[0][l]+square[k][0]+square[k][l])/4+pifometrix(MAX));
		
		
		// diamond
		square[i][l/2]=Math.round((square[i][l]+square[i][j])/2);
		square[k/2][l]=Math.round((square[i][l]+square[k][l])/2);
		square[k/2][j]=Math.round((square[i][j]+square[k][j])/2);
		square[k][l/2]=Math.round((square[k][j]+square[k][l])/2);
				
				
		
		for(divide = side/2 ; divide > 1 ; divide= divide/2  )
			{
				//alert(divide);
				loop = 0;
				i=0;
				
				for(k=divide;k<=side;k =k+divide ) 
					{
						j=0;
						for(l=divide;l<=side; l =l+divide) 
						{
							//alert("loop : "+loop+" -- i,j=("+i+","+j+") --k,l=("+k+","+l+") -- divide ="+divide+" -- side ="+side);
							//loop++;
							// center 
							square[(i+k)/2][(j+l)/2]=Math.round((square[i][j]+square[i][l]+square[k][j]+square[k][l])/4+pifometrix(noise));
							
							
							// diamond
							square[i][(j+l)/2]=Math.round((square[i][l]+square[i][j])/2);
							square[(i+k)/2][l]=Math.round((square[i][l]+square[k][l])/2);
							square[(i+k)/2][j]=Math.round((square[i][j]+square[k][j])/2);
							square[k][(j+l)/2]=Math.round((square[k][j]+square[k][l])/2);
							j=l;
							//for(var key in square) { alert("square["+key+"]="+square[key]);}
							//alert(square+'\n\n');
						}
						
						i=k;
						
					}
					
				
			}
		
		
		return square;
		
}


// random 
function pifometrix(number) {
	return Math.random()*number*2-number;
}