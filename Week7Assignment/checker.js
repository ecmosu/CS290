// Path detail used to easily configure dev and prod environments
// Code adapted from documentation at https://nodejs.org/api/path.html
var path = require('path');
var viewsPath = path.join(__dirname, '/views');
var layoutsPath = path.join(viewsPath, '/layouts');

//Adapted from Lecture and Express documentation at https://expressjs.com/en/guide/using-template-engines.html
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({layoutsDir:layoutsPath, defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('views', viewsPath);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Below is all adapted from the lecture.
//Home Page
app.get('/',function(req,res){
  res.render('home') 
});

//Data - GET
app.get('/data',function(req,res){
  
  //Build Detail From Query
  var queryDetail = [];
  for (var p in req.query){
    queryDetail.push({'name':p,'value':req.query[p]})
  }

  var context = {};
  context.type = req.method;
  context.queryDetail = queryDetail;
  res.render('data', context) 
});

//Data - POST
app.post('/data',function(req,res){
  //Build Detail From Query
  var queryDetail = [];
  for (var p in req.query){
    queryDetail.push({'name':p,'value':req.query[p]})
  }

  //Build Detail From Body
  var bodyDetail = [];  
  for (var p in req.body){
    bodyDetail.push({'name':p,'value':req.body[p]})
  }

  var context = {};
  context.type = req.method;
  context.queryDetail = queryDetail;
  context.bodyDetail = bodyDetail;
  res.render('data', context)
});

//Handle 404
app.use(function(req,res){
  res.status(404);
  res.send('404 - Not Found');
});

//Handle 500
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

//Start Server
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});