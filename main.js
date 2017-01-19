var fs= require("fs");
var HashMap= require('hashmap');

var writerStream0 = fs.createWriteStream('myJsCrime1.json',{
  flags: "a",
  encoding: "UTF8",
  mode: 0744
});
var writerStream1 = fs.createWriteStream('myJsCrime2.json',{
  flags: "a",
  encoding: "UTF8",
  mode: 0744
});
var writerStream2 = fs.createWriteStream('myJsCrime3.json',{
  flags: "a",
  encoding: "UTF8",
  mode: 0744
});
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('crime.csv')
});
var x=0;
var header;
var elements;
var flag=0;
var xxx=0;
var HashMap= require('hashmap');
//1. THEFT
var over=new HashMap();
var under=new HashMap();
//2.Assault
var arrested=new HashMap();
var notArrested=new HashMap();
//3.Index
var index=new Set();
var nonIndex=new Set();
var violent=new Set();
var property=new Set();
var indexCount=0;
var nonIndexCount=0;
var violentCount=0;
var propertyCount=0;

index.add("01A");
index.add("2");
index.add("3");
index.add("04A");
index.add("04B");
index.add("5");
index.add("6");
index.add("7");
index.add("9");

nonIndex.add("01B");
nonIndex.add("08A");
nonIndex.add("08B");
nonIndex.add("10");
nonIndex.add("11");
nonIndex.add("12");
nonIndex.add("13");
nonIndex.add("14");
nonIndex.add("15");
nonIndex.add("16");
nonIndex.add("17");
nonIndex.add("18");
nonIndex.add("19");
nonIndex.add("20");
nonIndex.add("22");
nonIndex.add("24");
nonIndex.add("26");

violent.add("01A");
violent.add("2");
violent.add("3");
violent.add("04A");
violent.add("04B");

property.add("5");
property.add("6");
property.add("7");
property.add("9");


for(xxx=2001;xxx<2017;xxx++)
{
  over.set(""+xxx, 0);
  under.set(""+xxx, 0);
  arrested.set(""+xxx, 0);
  notArrested.set(""+xxx,0);
}


lineReader.on('line', function (line) {

  var data=new Array();
  if(x==1)
  {
    //model the data
    elements=line.split(',');

    for(each=0,d=0;each<18;each++,d++)
    {
      s='';
      if(elements[d].charAt(0)=='\"')
      {
        if(elements[d].charAt(elements[d].length-1)=='\"'&&elements[d].length!=1)
        {
          elements[d]=elements[d].slice(1,elements[d].length-1);
        }
        else
        {
          s=elements[d].slice(1,elements[d].length)+',';
          d++;
          while(!(elements[d].charAt(elements[d].length-1)=='\"'))
          {
            s+=elements[d]+',';
            d++;
          }
          s+=elements[d].slice(0,elements[d].length-1);
          elements[d]=s;
        }
      }
      data[each]=elements[d];
    }


    //1.Theft
    if(data[5] === "THEFT")
    {
      if(data[6] === "OVER $500")
      {
        over.set(data[17], over.get(data[17])+1);
      }
      if(data[6] === "$500 AND UNDER")
      {
        under.set(data[17], under.get(data[17])+1);
      }
    }//2.Assault
    else if(data[5] === "ASSAULT")
    {

      if(data[8] === "true")
      {
        arrested.set(data[17], arrested.get(data[17])+1);
      }
      else
      {

        notArrested.set(data[17], notArrested.get(data[17])+1);
      }
    }
    //3.Index
    if(data[17] === "2015")
    {
      if(index.has(data[14]))
      {
        indexCount++;
      }
      if(nonIndex.has(data[14]))
      {
        nonIndexCount++;
      }
      if(violent.has(data[14]))
      {
        violentCount++;
      }
      if(property.has(data[14]))
      {
        propertyCount++;
      }
    }
  }
  else
  {
      header=line.split(",");
      x++;
  }
});

lineReader.on('close', function () {
  var obj;
  var arr=new Array();
  var arr1=new Array();
  for(xxx=2001;xxx<2017;xxx++)
  {
    //1.Theft
    obj=new Object();
    obj.year=""+xxx;
    obj.over=over.get(obj.year);
    obj.under=under.get(obj.year);
    arr.push(obj);
    //2.Assault
    obj=new Object();
    obj.year=""+xxx;
    obj.Arrested=arrested.get(obj.year);
    obj.NotArrested=notArrested.get(obj.year);
    arr1.push(obj);
  }
  writerStream0.write(JSON.stringify(arr));
  writerStream1.write(JSON.stringify(arr1));
  //3.Index
  obj=new Object();
  obj.year="2015";
  obj.Indexed=indexCount;
  obj.NonIndexed=nonIndexCount;
  obj.Violent=violentCount;
  obj.Property=propertyCount;
  arr=new Array();
  arr.push(obj);
  writerStream2.write(JSON.stringify(arr));
});
