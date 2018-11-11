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
    let timeResult = "",
        godziny,
        minuty,
        sekundy,
        dni;

    sekundy = secondsOnline > 60 ? secondsOnline % 60 : secondsOnline;
    minuty = secondsOnline > 60 ? Math.floor(secondsOnline / 60) : undefined;
    godziny = minuty > 60 ? Math.floor(minuty / 60) : undefined;
    minuty = minuty > 60 ? minuty % 60 : minuty;

    if(godziny !== undefined) {
      timeResult = godziny + " godzin ";
    }
    
    if(minuty !== undefined) {
      timeResult += minuty + " minut ";
    }
    
    timeResult += sekundy + " sekund";
    
    if(godziny > 24) {
      timeResult += ". Czyli: ";
      dni = Math.floor(godziny / 24);
      godziny = godziny > 24 ? godziny % 24 : godziny;

      timeResult+= dni + " dni ";
      
      if(godziny !== undefined) {
        timeResult += godziny + " godzin ";
      }
      
      if(minuty !== undefined) {
        timeResult += minuty + " minut ";
      }
      
      timeResult += sekundy + " sekund";

    }

    return timeResult;
}

module.exports = {
    gCT: getCurrentTime,
    ifExist: ifExist,
    convertedTime: convertedTime
};