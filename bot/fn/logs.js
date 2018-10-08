var fn = require('./fn');
var io = require('../../app').io;
var fs = require('fs');

module.exports = function(msg) {
    console.log(fn.gCT()+msg);
    io.emit("log", fn.gCT()+msg);
    fs.appendFileSync(__dirname + "/logs/logs.txt", "\n" + fn.gCT()+msg);
    // console.log(msg) // tymaczasowo
};