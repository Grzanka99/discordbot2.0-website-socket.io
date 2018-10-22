var basic = require("./msgFunctions/basic");
var moderateServer = require("./msgFunctions/moderateServer");
var log = require("../logs");

module.exports = function (msg) {
    switch (msg.content) {
        case '?help':
            basic.help(msg);
            break;
        case '?time':
            basic.time(msg);
            break;
        case '?id':
            msg.reply(msg.author.id);
            break;
        default:
            switchIf(msg);
            break;
    }
}

function switchIf(msg) {
    if (checkString(msg) === "?addRole") moderateServer.addRole(msg);
    if (checkString(msg) === "?addMod") moderateServer.addMod(msg);
    if (checkString(msg) === "?removeRole") moderateServer.removeRole(msg);
    if (checkString(msg) === "?removeMod") moderateServer.removeMod(msg);
}

function checkString(msg) {
    return msg.content.substring(0, contain());

    function contain() {
        if (msg.content.indexOf(" ") > -1) return msg.content.indexOf(" ");
        else return msg.content.lenght;
    }
}
