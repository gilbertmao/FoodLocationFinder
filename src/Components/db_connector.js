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
      console.log("Posting");
      db.con.query("INSERT INTO users (username, hashed_password) VALUES (\x22" + username + "\x22, \x22" + hashed_password + "\x22);", function (err, result) {
        if (err) throw err;
      });
  }

  user_exists(username) {
    console.log("Checking for " + username);
    db.con.query("select * from users where username = \x22"+ username +"\x22", function (err, result) {
      if (result.length == 0) {
        console.log("Incorrect Username");
        return false;
      }
      return true;
    });
  }

  validate(username, hashed_password) {
    console.log("Validating")
    db.con.query("select * from users where username = \x22"+ username +"\x22", function (err, result) {
      console.log(result)
      if (result.length == 0) {
        console.log("Incorrect Username")
        return false;
      }
      if(!hashed_password.localeCompare(result[1]["hashed_password"])) {
        console.log("Found! Given:" + hashed_password + " True:" + result[0]["hashed_password"])
        return true;
      }
      console.log("Mismatch! Given: " + hashed_password + " True:" + result[0]["hashed_password"])
      return false;
    });
  }
}

db = new db_connector();
db.user_exists("Jon")
