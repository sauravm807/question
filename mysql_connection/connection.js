const mysql = require('mysql2');
const dbConfig = require("../config/config").DB;

function mysqlConnection() {
    const connection = mysql.createConnection({
        host: dbConfig.host || 'localhost',
        user: dbConfig.user || 'root',
        password: dbConfig.password || '',
        database: 'employeedb'
    });

    connection.connect((err) => {
        if (err) {
            console.log('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
    return connection;
}

module.exports = mysqlConnection;