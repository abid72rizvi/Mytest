var result = [];


	var fs = require('fs'),
	    readline = require('readline'),
	    stream = require('stream');
	var stk="stacked.json";
	var arrest="arrest.json";
	fs.writeFileSync(stk,' ','utf-8');
	fs.writeFileSync(arrest,' ','utf-8');
	var instream = fs.createReadStream('text.csv');
	var writableStream = fs.createWriteStream('file2.json');
	var outstream = new stream;
	outstream.readable = true;
	outstream.writable = true;

	 var ended = false;
	 instream.on('end', () => { ended = true });

	var rl = readline.createInterface({
	    input: instream,
	    output: outstream,
	    terminal: false
	});

	var lineCount=0;
	var myHeader="";
	var num=0;
	var n8=0;
	var n9=0;

	//var nobj={};

	rl.on('line', function(line) 
	{
	    
				var headers = myHeader.split(",");//all headers

				var obj = {};

				var row = line,
				headCount = 0,
				startValue = 0,
				count = 0;
				
					
					while (count < row.length) 
					{
						

						var c = row[count];

						if (c == '"') 
						{
							do
							{
								c = row[++count]; 
								
							} 
							while(c !== '"' && count < row.length - 1);
						}

						if (c == ',' || count == row.length - 1) 
						{
							var value = row.substr(startValue,count - startValue).trim();//one column

							if (value[0] == '"') 
							{ 
								value = value.substr(1); 
							}
							if (value[value.length - 1] == ',') 
							{ 
								value = value.substr(0, value.length - 1); 
							}
							if (value[value.length - 1] == '"') 
							{ 
								value = value.substr(0, value.length - 1); 
							}

							var key = headers[headCount++];
							obj[key] = value;
							startValue = count + 1;
						}
						++count;
					}
					if(lineCount==0)
					{
						lineCount++;
						myHeader=line;
					}
					else
					{
						
						
	                    if((obj. Description==='OVER $500'||obj. Description==='$500 AND UNDER') && (+obj.Year>2001) && (+obj.Year<2016)  )
	                    {
	                    	   var nobj={};
								nobj['Year']=obj.Year;
	                    		nobj['Description']=obj.Description;

	                    		//console.log(obj.Year+"   "+obj.Description     );
	                    		//console.log(nobj);
	                    		result.push(nobj);

	                           //  console.log(result);

	                    	
					   }
					}
					 

					
			
	});


	rl.on('close',function()    
		{
		 console.log(result.length+"    klkl   ");  
		//console.log(result);
	      
	//console.log(";;;;;;;;;;;;;;;;;;;;;;;;new arrays;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
	/*console.log(newarray);  

		newarray=result.filter(function (el) {  return (+el.Year ===2009 );});
	     console.log("lemgth of new array is    2009"+newarray.length+" ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
	 	
	 */


	for(var o=2001;o<=2016;o++)
	{

		var obj1={};
		var newarray=result.filter(function (el) {  return (+el.Year ===o  && el. Description==='OVER $500' );});
		
		/*if(newarray.length!=0)
		{
			console.log("length of     "+o+"   is    "+newarray.length+"      and for over  $500");
		}*/

	     obj1['Year']=o;
	     obj1['Over $500']=newarray.length;
	      newarray=result.filter(function (el) {  return (+el.Year ===o  && el. Description==='$500 AND UNDER' );});
		
		/*if(newarray.length!=0)
		{
			console.log("length of     "+o+"   is    "+newarray.length+"      and for under  $500     ");
		
		}
	*/
		 obj1['$500 AND UNDER']=newarray.length;
		 console.log(obj1);
		 fs.appendFile(stk, JSON.stringify(obj1)+"\n", 'utf8',function(err){});
	}


		//fs.writeFile('myjsonfile.json', json, 'utf8', callback);

		});
