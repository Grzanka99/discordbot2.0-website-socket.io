var fn = require('./fn');
var io = require('../../app').io;

module.exports = function(msg) {
    console.log(fn.gCT()+msg);
    io.emit("log", fn.gCT()+msg);

    // console.log(msg) // tymaczasowo
}