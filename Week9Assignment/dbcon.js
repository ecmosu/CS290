var mysql = require('mysql');
// var pool = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'classmysql.engr.oregonstate.edu',
//   user            : 'cs290_morganer',
//   password        : '7440',
//   database        : 'cs290_morganer'
// });

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'password',
  database        : 'cs290_morganer'
});

module.exports.pool = pool;