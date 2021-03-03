(function () {
  const socketIo = io();
  const messagesElem = $('#messages');
  const membersElem = $('#members');
  //socketIo.emit('message', 'This is a message from the client');
  const loginForm = $('#loginForm');
  loginForm.submit(e => {
    e.preventDefault();

    socketIo.emit('login', $('#name').val(), callbackData => {
      if (callbackData.error) {
        $('#error').text(callbackData.msg);
      } else {
        loginForm.slideUp();
        $('#messagesContainer').slideDown();
        messagesElem.append(callbackData.msg);
      }
    });
  });

  const messageInput = $('#message');
  $('#messageForm').submit(e => {
    e.preventDefault();
    const msg = messageInput.val().trim();
    if (msg) {
      socketIo.emit('message', { text: messageInput.val(), target: membersElem.val() });
    }
  });

  socketIo.on('message', msg => {
    let private = '';
    if (msg.dm) {
      private = 'privately'
    }
    messagesElem.append(`<div>${msg.author} wrote ${private}: ${msg.msg}</div>`);
  });

  socketIo.on('dropDownList', fullList => {
    membersElem.empty();
    membersElem.append(`<option value="Everyone">Everyone</option>`);
    membersElem.append(fullList);
  });
}());