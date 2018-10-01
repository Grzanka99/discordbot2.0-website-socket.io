var Discord = require("discord.js");
var auth = require("../json/auth.json");
var fn = require("./fn/fn");
var io = require("../app").io;
var log = require("./fn/logs");
var con = require("./fn/conn");

var client = new Discord.Client();
module.exports = client;

client.on("ready", () => {
    log("I am ready!");
    client.user.setActivity("Bot Admin, say ?help");
});

try {
    var voiceTime = require("./fn/actions/voiceTime");
    var msg = require("./fn/actions/messages");

    client.on('voiceStateUpdate', voiceTime);
    client.on('message', msg);

} catch (err) {
    console.log(err);
}


client.login(auth.token);