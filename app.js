var express = require('express');
var mongoose = require('mongoose');
var index = require('./routes/index');
var assignmentRouter = require('./routes/assignment');
var bodyParser = require('body-parser');

var app = express();

//for input data
//sets public as the base directory
app.use(bodyParser.json());
app.use(express.static('public'));

//routes through index and assignment.js respectively
app.use('/', index);
app.use('/assignment', assignmentRouter)

//database url and connects through that database
var mongoURI = 'mongodb://localhost:27017/assignments';
var MongoDB = mongoose.connect(mongoURI).connection;

//error check
MongoDB.on('error', function(err){
  console.log('mongodb connection error:', err);
});

//if no error opens up the database
MongoDB.once('open', function(){
  console.log('mongodb connection open!');
});

//listening on port 3000
var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port', port);
  console.log('Press Ctrl-c to quit');
})
