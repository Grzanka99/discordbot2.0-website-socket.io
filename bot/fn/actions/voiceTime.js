var con = require("../conn");
var fn = require("../fn");
var timeToRole = require("../../../json/data.json").czas;
var log = require("../logs");

var licz = new Array();

module.exports = async function (oldMember, newMember) {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    let onlineTime;
    let userID = newMember.user.id;

    function liczOnline() {
        onlineTime += 10;

        con.query("UPDATE users set time = " + onlineTime + " where user_id = " + userID + ";");

        if (onlineTime >= timeToRole && !newMember.guild.roles.has('name', 'User')) {
            let rola = newMember.guild.roles.find(val => val.name === 'User');
            newMember.addRole(rola);

            if (onlineTime === timeToRole) log(newMember.user.username + " jest aktywnym użytkownikiem");
        }
    }

    function getOnlineTime() {
        let getTime = "select time from users where user_id =" + userID + ";";
        return new Promise(resolve => {
            con.query(getTime, function (err, res) {
                resolve(res[0].time);
            });
        });
    }

    function addUser() {
        let addUser = "insert into users (user_id, time) values (" + userID + ", 0);";
        return new Promise(resolve => {
            con.query(addUser, function (err, res) {
                resolve(true);
            });
        });
    }

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
        log('User: ' + newMember.user.username + ' join to ' + newUserChannel.name);

        if (await fn.ifExist(userID)) {
            onlineTime = await getOnlineTime();
            licz[userID] = setInterval(liczOnline, 10000);
        } else {
            log('Nie istnieje!, Tworzę użytkownika w bazie');
            await addUser();

            onlineTime = await getOnlineTime();
            licz[userID] = setInterval(liczOnline, 10000);
        }
    } else if (newUserChannel === undefined) {
        log('User: ' + newMember.user.username + ' left from ' + oldUserChannel.name);
        clearInterval(licz[userID]);
    }
}