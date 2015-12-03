var http = require('http');
var fs = require('fs');
var ld  =require('lodash');
var querystring = require('querystring');
var playersArray = [];
var playersLimit = 0;
var gameStarted = false;

var provideFile=function(req,res){
	console.log('req.url',req.url)
	var path = (req.url == '/') ? './home.html' :'./public' + req.url;
	console.log('path',path)
	fs.exists(path,function(exist){
		if(exist){
			fs.readFile(path,function(err,data){
				res.statusCode = 200;
				res.end(data);
			});
		}
		else{
			res.statusCode = 404;
			res.end('not found');
		};
	});
};
	
var requestHandler = function(req,res){
	if(req.method == 'GET') provideFile(req,res);
	if(req.method == 'POST') provideData(req,res);
};

var server = http.createServer(requestHandler);
server.listen(9000);
