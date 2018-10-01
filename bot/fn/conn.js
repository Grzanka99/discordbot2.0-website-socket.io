var mysql = require('mysql');
var datab = require('../../json/data.json');

module.exports = mysql.createConnection({
    host: datab.host,
    user: datab.user,
    password: datab.password,
    database: datab.database
});