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

const mysql = require('mysql2/promise');

const connectionConfig = {
  host: 'YOUR_CLOUD_SQL_HOST',
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  database: 'YOUR_DB_NAME',
};

const addUser = async (userData) => {
  const connection = await mysql.createConnection(connectionConfig);
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  
  try {
    const [result] = await connection.execute(query, [userData.name, userData.email]);
    console.log('User added with ID:', result.insertId);
  } catch (error) {
    console.error('Error adding user:', error);
  } finally {
    await connection.end();
  }
};