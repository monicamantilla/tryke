
var mysql = require("mysql"); // We require the extension of mysql
// We use mysql to create a connection to local host on mysql port 3306
var connection;

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Larita1*',
    database: 'trykedb'
  });
};

connection.connect()
// We export the connection for later use
module.exports = connection;