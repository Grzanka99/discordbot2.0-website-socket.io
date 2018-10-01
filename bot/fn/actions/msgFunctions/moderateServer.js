var fn = require("../../fn");
// var con = require("../../conn");
var async = require("./async");
var log = require("../../logs");

module.exports = {
    addRole: async function (msg) {
        try {
            if (await async.allowed(msg.author.id)) {
                if (checkData(msg)) {
                    let addRoleName = getData(msg);
                    let newUserId = getUserId(msg);
                    let roleId = getRoleId(msg, addRoleName);

                    if(await async.checkPerm(msg.author.id, addRoleName)) addNewRole(msg, newUserId, roleId);
                } else throw "Niepoprawna składnia, poprawna to: ?addRole [nazwaRoli] nazwaUżytkownika";
            } else throw "Nie masz uprawnien do tej operacji!";
        } catch (err) {
            msg.reply(err);
            log(msg.author.username + ": " + err);
        }
    },
    removeRole: async function (msg) {
        try {
            if (await async.allowed(msg.author.id)) {
                if (checkData(msg)) {
                    let removeRoleName = getData(msg);
                    let newUserId = getUserId(msg);
                    let roleId = getRoleId(msg, removeRoleName);

                    if(await async.checkPerm(msg.author.id, removeRoleName)) removeNewRole(msg, newUserId, roleId);
                } else throw "Niepoprawna składnia, poprawna to: ?removeRole [nazwaRoli] nazwaUżytkownika";
            } else throw "Nie masz uprawnien do tej operacji!";
        } catch (err) {
            msg.reply(err);
            log(msg.author.username + ": " + err);
        }
    },
    addMod: async function (msg) {
        null;
    },

    removeMod: async function (msg) {
        null;
    }
}

function checkData(msg) {
    if (msg.content.indexOf('[') == -1) return false;
    if (msg.content.indexOf(']') == -1) return false;
    if (msg.content.indexOf('<@') == -1) return false;

    return true;
}

// Parse message

function getData(msg) {
    let start = msg.content.indexOf('[')+1;
    let stop = msg.content.indexOf(']');

    return msg.content.substring(start, stop);
}

function getRoleId(msg, addRoleName) {
    let roleId = msg.guild.roles.find('name', addRoleName);
    if(roleId == null) throw "Podana rola nie istnieje!";
    
    return roleId.id;
}

function getUserId(msg) {
    let start = msg.content.indexOf('<@')+2;
    let stop = msg.content.indexOf('>');

    return msg.content.substring(start, stop);
}
// end of parsing

function addNewRole(msg, newUserId, roleId) {
    let member = msg.guild.members.get(newUserId);
    try 
    {
        if(member.roles.has(roleId)) throw "Użytkownik ma rolę, pomijam dodanie roli.";
        member.addRole(roleId);
        msg.reply("Dodano pomyślnie!");
        log("User: " + msg.author.username + " dał użytkownikowi: " + member.user.username + " Rolę: " + msg.guild.roles.get(roleId).name);
    }
    catch (err) 
    {
        log(err);
        msg.reply("Dodano pomyślnie.");
    }
}

function removeNewRole(msg, newUserId, roleId) {
    let member = msg.guild.members.get(newUserId);
    try 
    {
        if(!member.roles.has(roleId)) throw "Użytkownik nie ma roli, pomijam usuwanie roli.";
        member.removeRole(roleId);
        msg.reply("Usunięto pomyślnie!");
        log("User: " + msg.author.username + " zabrał użytkownikowi: " + member.user.username + " Rolę: " + msg.guild.roles.get(roleId).name)
    }
    catch (err) 
    {
        log(err);
        msg.reply("Usunięto pomyślnie.");
    }
}