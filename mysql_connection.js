var mysql = require("mysql2");
var util = require("util");
require("dotenv").config();

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

var exe = util.promisify(connection.query).bind(connection);

module.exports = exe;