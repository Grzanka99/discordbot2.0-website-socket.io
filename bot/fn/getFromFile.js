var io = require('../../app').io;
var fs = require('fs');
    readline = require('readline');

module.exports = () => {
    io.on('connection', function(socket){
        var rd = readline.createInterface({
            input: fs.createReadStream(__dirname + "/../../logs/logs.txt"),
            output: process.stdout,
            console: false
        });

        rd.on('line', function (line) {
            socket.emit('log', line);
        })
    });
};