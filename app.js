
// app.js
// Entry point for app

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// init custom modules
var config = require('./config.js');

app.use(express.static(__dirname + '/page'));
// HTTP-request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

// GET-routes for Json-file downloads
app.get('/dataclosed',function(req,res){
 var obj  = require('./dataclosed.json');
console.log(obj);
res.send(JSON.stringify(obj));
});
app.get('/dataopen',function(req,res){
 var obj  = require('./dataopen.json');
 console.log(obj);
res.send(JSON.stringify(obj));

});

// Send 404 if no route is matched
app.use(function(req, res, next) {
    res.status(404).send("404 Not found.");
})

app.listen(config.port, function() {
    console.log("Test app listening on port " + config.port + ".");
});