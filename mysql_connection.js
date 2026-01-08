var mysql = require("mysql2");
var util = require("util");
require("dotenv").config();

var connection = mysql.createConnection({
    host:bbulbsztxm12brevpywu-mysql.services.clever-cloud.com,
    user: uspvook8ktdjmybrprocess.env.USER,
    password: vNheCOlfQSao7ktGUc0K,
    database: bbulbsztxm12brevpywu,
});

var exe = util.promisify(connection.query).bind(connection);

module.exports = exe;
