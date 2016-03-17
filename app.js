var express = require('express');
var fs = require('fs');
var request = require('request');
var path = require('path');

var app = express();


//Init server
app.listen(3000, function () {
  console.log('servidor en puerto 3000');
});

//Main page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

//Restful api
app.get('/noticias', function (req, res) {
	console.log("El filtro es "+req.query.texto)
	var filter=req.query.texto;
	var total="";
	var title="";
	request('http://www.rtve.es/api/noticias', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        var obj = JSON.parse(body);
	        console.log("Se han encontrado "+obj.page.items.length+"noticias");
	        for(i=0;i<obj.page.items.length;i++){
	        	title = obj.page.items[i].longTitle;
	        	if(title.indexOf(filter)>-1){
	        		total=total+"<p>"+title+"</p>"
	        	}
	        }
	        if(total==""){
	        	console.log("No hay noticias que concuerdan con el filtro");
	        	total="<p>No hay noticias con ese filtro</p>"
	        }
	        else{
	        	console.log("Hay noticias que concuerdan con el filtro");
	        }
	        res.send(total);
	     }
	});
});


