var fs = require('fs');
var con = require("../conn");
var fn = require("../fn");
var timeToRole = require("../../../json/data.json").czas;
var log = require("../logs");

module.exports = async function (oldMember, newMember) {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    let userID = newMember.user.id;
    let oldTimeOnline;

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
        log('User: ' + newMember.user.username + ' join to ' + newUserChannel.name);
        if (await fn.ifExist(userID)) {
            oldTimeOnline = await getOnlineTime(userID);
            joinTime(userID);
        } else {
            log('Nie istnieje!, Tworzę użytkownika w bazie');
            await addUser(userID);
            oldTimeOnline = await getOnlineTime(userID);
            joinTime();
        }
    } else if (newUserChannel === undefined) {
        log('User: ' + newMember.user.username + ' left from ' + oldUserChannel.name);
        try {
            countTime(userID);
            checkRole(userID, oldTimeOnline, newMember);
        } catch(err) {
            console.log(err);
        }
    }
}

function joinTime(id) {
    let now = new Date().getTime();
    fs.writeFileSync(__dirname + "/files/" + id + ".txt", now);
}

function countTime(id) {
    let now = new Date().getTime();
    let read = parseInt(fs.readFileSync(__dirname + "/files/" + id + ".txt"));
    let online = parseInt((now - read) / 1000);
    addTime(online, id);
    fs.unlinkSync(__dirname + "/files/" + id + ".txt");
}

async function addTime(time, id) {
    let onlineTime = await getOnlineTime(id);
    onlineTime += time;
    con.query("UPDATE users set time = " + onlineTime + " where user_id = " + id + ";");
}

function getOnlineTime(id) {
    let getTime = "select time from users where user_id =" + id + ";";
    return new Promise(resolve => {
        con.query(getTime, function (err, res) {
            resolve(res[0].time);
        });
    });
}

async function checkRole(id, oldTime, newMember) {
    let onlineTime = await getOnlineTime(id);
    if (onlineTime >= timeToRole && !newMember.guild.roles.has('name', 'User')) {
        let rola = newMember.guild.roles.find(val => val.name === "User");
        newMember.addRole(rola);

        if (oldTime < timeToRole) {
            log(newMember.user.username + " jest aktywnym użytkownikiem");
        }
    }
}

function addUser(id) {
    let addUser = "insert into users (user_id, time) values (" + id + ", 0);";
    return new Promise(resolve => {
        con.query(addUser, function (err, res) {
            resolve(true);
        });
    });
}