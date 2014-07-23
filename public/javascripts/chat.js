var Chat = function(socket) {
  this.socket = socket;
};

Chat.prototype.updateNickname = function(nickname) {
  this.socket.emit('update_nickname', {nickname: nickname});
};

Chat.prototype.sendMessage = function(message) {
  this.socket.emit('message_from_client', {text: message });
};



// socket.emit('message', { text: 'this is the text' });
// socket.on('send_message', function (data) {
//   console.log(data);
//   io.sockets.emit('message', {message: data.message});
// });

