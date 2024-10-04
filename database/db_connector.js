//npm install mysql

// This file connects to the remote Google Cloud Platform
// It is currently not running security features in the interest of being fully operational for integration on Saturday
// At the moment, the database is allowing accesses from all networks to prevent problems with authentication delaying progress on other code aspects

console.log('Beginning');

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "35.184.92.72",
  user: "Group9",
  password: "food@4193",
  database: "production"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
});