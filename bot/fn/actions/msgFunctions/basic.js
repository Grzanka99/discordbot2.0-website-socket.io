var con = require("../../conn");
var fn = require("../../fn");
var log = require("../../logs");

module.exports = {
    help: async function (msg) {
            try {
                msg.reply("Dostępne komendy: \n" + await getCommands());
            } catch (err) {
                log(err);
            }
        },

        time: async function (msg) {
            if (fn.ifExist(msg.author.id)) msg.reply("Twój czas na czacie głosowym to: " + fn.convertedTime(await userTime(msg.author.id)));
            else msg.reply("Twój czas na czacie głosowym to: 0 minut");
        }
}

function getCommands() {
    let q = "SELECT*FROM commands ORDER BY cmd_name";
    return new Promise(resolve => {
        con.query(q, function (err, res) {
            let out = "";

            res.forEach(line => {
                out += "        " + line.cmd_name + ":   " + line.cmd_desc + "\n";
            });

            resolve(out);
        });
    });
}

function userTime(id) {
    let q = "select time from users where user_id =" + id + ";";
    return new Promise(resolve => {
        con.query(q, function (err, res) {
            resolve(res[0].time);
        });
    });
}