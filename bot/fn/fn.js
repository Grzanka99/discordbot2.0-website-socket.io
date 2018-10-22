var con = require("./conn");

function getCurrentTime() {
    let d = new Date();
    let currentTime = '';

    if (d.getDate() < 10) currentTime += 0 + '' + d.getDate();
    else currentTime += d.getDate();

    if ((d.getMonth() + 1) < 10) currentTime += "." + 0 + (d.getMonth() + 1);
    else currentTime += "." + (d.getMonth() + 1);

    currentTime += "." + d.getFullYear();

    if (d.getHours() < 10) currentTime += "@" + 0 + d.getHours();
    else currentTime += "@" + d.getHours();

    if (d.getMinutes() < 10) currentTime += ":" + 0 + d.getMinutes();
    else currentTime += ":" + d.getMinutes();

    if (d.getSeconds() < 10) currentTime += ":" + 0 + d.getSeconds() + "# ";
    else currentTime += ":" + d.getSeconds() + "# ";

    return currentTime;
}

function ifExist(userID) {
    let query = "select * from users where user_id = " + userID;
    return new Promise(resolve => {
        con.query(query, function (err, res) {
            res.length > 0 ? resolve(true) : resolve(false);
        });
    });
}

function convertedTime(secondsOnline) {
    let timeResult;

    if (secondsOnline / 60 > 999) {
        let minutes = Math.round(secondsOnline / 60);
        timeResult = Math.round(minutes / 60) + " godzin";
    } else {
        timeResult = Math.round(secondsOnline / 60) + " minut";
    }
    return timeResult;
}

module.exports = {
    gCT: getCurrentTime,
    ifExist: ifExist,
    convertedTime: convertedTime
};