//npm install mysql
//Uses Public IP

console.log('Beginning');

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "35.184.92.72",
  user: "Group9",
  password: "food@4193",
  database: "Test"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
});