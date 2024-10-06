//npm install mysql

// This file connects to the remote Google Cloud Platform
// It is currently not running security features in the interest of being fully operational for integration on Saturday
// At the moment, the database is allowing accesses from all networks to prevent problems with authentication delaying progress on other code aspects
class db_connector{
  constructor() {
    console.log('Beginning');

    var mysql = require('mysql');

    this.con = mysql.createConnection({
      host: "35.184.92.72",
      user: "Group9",
      password: "food@4193",
      database: "production"
    });

    this.con.connect(function(err) {
      if (err) throw err;
      console.log("Connected");
    });
  }

  add_user(username, hashed_password) {
      console.log("Posting")
      db.con.query("INSERT INTO users (username, hashed_password) VALUES (\x22" + username + "\x22, \x22" + hashed_password + "\x22);", function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
      });
  }
}

