var path = require('path');
var viewsPath = path.join(__dirname, '/views');
var layoutsPath = path.join(viewsPath, '/layouts');

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({layoutsDir:layoutsPath, defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('views', viewsPath);
app.set('view engine', 'handlebars');
app.set('port', 3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.render('home') //We can omit the .handlebars extension as we do below
});

app.get('/data',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.type = req.method;
  context.dataList = qParams;
  res.render('data', context) //We can omit the .handlebars extension as we do below
});

app.post('/data',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams);
  console.log(req.body);
  var context = {};
  context.type = req.method;
  context.dataList = qParams;
  res.render('data', context) //We can omit the .handlebars extension as we do below
});

app.use(function(req,res){
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});