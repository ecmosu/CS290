// Path detail used to easily configure dev and prod environments
// Code adapted from documentation at https://nodejs.org/api/path.html

//Prerender Partials - ./node_modules/handlebars/bin/handlebars ./views/partials/ -f prerenderedPartials.js

var path = require('path');
var viewsPath = path.join(__dirname, '/views');
var layoutsPath = path.join(viewsPath, '/layouts');
var partialsPath = path.join(viewsPath, '/partials');
var mysql = require('./dbcon.js');

//Adapted from Lecture and Express documentation at https://expressjs.com/en/guide/using-template-engines.html
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({
  layoutsDir: layoutsPath,
  partialsDir: partialsPath,
  defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('views', viewsPath);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure Static Paths
//Client Side Handlebars To Assist With Re-rendering data
app.use(express.static(path.join(__dirname, '/node_modules/handlebars/')));
//Below utilized for Bootstrap modal and styling
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap-datepicker/')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery/')));
//Custom Page Scripts
app.use(express.static(path.join(__dirname, '/public')))

//Other Configurations
const dateFormat = '%m-%d-%Y';

//Below is all adapted from the lectures.
//Home Page
app.get('/', function (req, res) {
  var context = {};
  context.type = req.method;
  context.results = [];
  res.render('home', context)
});

//Exercises - GET
app.get('/exercises', function (req, res) {
  var context = {};
  context.type = req.method;
  context.results = [];
  mysql.pool.query(`SELECT id, name, reps, weight, DATE_FORMAT(date, '` + dateFormat + `') AS date, lbs
    FROM workouts ORDER BY workouts.date DESC`, function (err, result, fields) {
      if (err) console.log(err);
      context.results = result;
      res.send(context);
    });
});

//Exercise - POST
app.post('/exercise', function (req, res) {
  console.log(req.body);
  var responseDetail = {};

  const exercise = req.body;
  if (exercise.id > 0) //Update
  {
    mysql.pool.query(`UPDATE workouts 
    SET name = ?, reps = ?, weight = ?, date = STR_TO_DATE(?, '` + dateFormat + `'), lbs = ?
    WHERE id = ?`,
      [exercise.name, exercise.reps, exercise.weight, exercise.date, exercise.lbs, exercise.id],
      function (err, result, fields) {
        if (err) {
          responseDetail.success = false;
          responseDetail.message = err.message;
        }
        else {
          responseDetail.success = true;
          responseDetail.message = exercise.name + " Updated Successfully!";
        }
        res.send(responseDetail);
      });
  }
  else //Insert
  {
    mysql.pool.query(`INSERT INTO workouts
    (name, reps, weight, date, lbs) 
    VALUES (?, ?, ?,  STR_TO_DATE(?, '` + dateFormat + `'), ?)`,
      [exercise.name, exercise.reps, exercise.weight, exercise.date, exercise.lbs],
      function (err, result, fields) {
        if (err) {
          responseDetail.success = false;
          responseDetail.message = err.message;
        }
        else {
          responseDetail.success = true;
          responseDetail.message = exercise.name + " Added Successfully!";
        }
        res.send(responseDetail);
      });
  }
});

//Exercise - DELETE
app.delete('/exercise', function (req, res) {
  console.log(req.body);
  var responseDetail = {};

  const exercise = req.body;
  mysql.pool.query(`DELETE FROM workouts
  WHERE id = ?`,
    [exercise.id],
    function (err, result, fields) {
      if (err) {
        responseDetail.success = false;
        responseDetail.message = err.message;
      }
      else {
        console.log(result);
        responseDetail.success = true;
        responseDetail.message = "Deleted Successfully!";
      }
      res.send(responseDetail);
    });
});

app.get('/reset-table', function (req, res, next) {
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function (err) { //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts(" +
      "id INT PRIMARY KEY AUTO_INCREMENT," +
      "name VARCHAR(255) NOT NULL," +
      "reps INT," +
      "weight INT," +
      "date DATE," +
      "lbs BOOLEAN)";
    mysql.pool.query(createString, function (err) {
      context.results = "Table reset";
      res.render('home', context);
    })
  });
});

//Handle 404
app.use(function (req, res) {
  res.status(404);
  res.send('404 - Not Found');
});

//Handle 500
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

//Start Server
app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});