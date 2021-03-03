const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require("socket.io")(server);

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const chatters = [];
socketIo.on("connection", socket => {
  console.log('server got a connection');
  let name;
  let listOptions;
  socket.on('login', (loginName, callback) => {
    const n = loginName.trim();
    const spaceCheck = n.search(" ")
    if (!n) {
      callback({ msg: `Username is required.`, error: true });
    }
    if (spaceCheck > -1) {
      callback({ msg: `userName cannot contain spaces.`, error: true });
    } else if (chatters.find(c => c.userName === n)) {
      callback({ msg: `Username ${n} already used. Please choose another.`, error: true });
    } else {
      welcomeMsg = getChatters(chatters)
      name = n;
      chatters.push({ userName: name, socket: socket });
      callback({ msg: welcomeMsg, error: false });
      listOptions = setDropdown(chatters);
      socketIo.emit('dropDownList', listOptions);

      socket.on('message', msg => {
        const m = msg.text.trim();
        if (m) {
          if (msg.target === "Everyone") {
            socketIo.emit('message', { author: name, msg: msg.text, dm: false });
          } else {
            dm = chatters.find(c => c.userName === msg.target);
            dm.socket.emit('message', { author: name, msg: msg.text, dm: true });
            if (dm.socket !== socket) {
              socket.emit('message', { author: name, msg: msg.text, dm: true });
            }
          }
        }
      });
    }
  });
});


function setDropdown(chatters) {
  let chatList = '';
  if (chatters.length > 0) {
    chatters.forEach(chatter => {
      chatList = chatList.concat(`<option value="${chatter.userName}">${chatter.userName}</option>`)
    });
  }
  return chatList;
}

function getChatters(chatters) {
  welcome = '<h3>Welcome! The following members are currently in the chat. </h3>';
  first = '<h3>Welcome! You are the first to join the chat!<h3>';
  if (chatters.length > 0) {
    chatters.forEach(chatter => {
      welcome = welcome.concat(`<h5>${chatter.userName}</h5>`)
    });
    return welcome;
  } else {
    return first
  }
}

app.use('/', (req, res, next) => {
  res.send('Hello World!');
});

server.listen(80);