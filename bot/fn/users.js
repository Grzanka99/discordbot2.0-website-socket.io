var io = require('../../app').io;
const con = require('./conn');
const fn = require('./fn');
const client = require('../bot');

io.on('connection', async function (socket) {
  let msg = await getUserAndTime();
  msg.forEach(row => {
    let out = {
      username: asd(row.user_id),
      time: fn.convertedTime(row.time)
    }

    if (out.username !== undefined) {
      socket.emit('username', out);
      // console.log(out);
    }
  });
});

async function getUserAndTime() {
  return new Promise(resolve => {
    con.query("SELECT user_id, time FROM users ORDER BY time DESC", function (err, res) {
      if (err) throw err;
      resolve(res);
    });
  });
}

function asd(id) {
  let user = client.users.find(user => user.id === id);
  if (user) return user.username;
  else return undefined;
}