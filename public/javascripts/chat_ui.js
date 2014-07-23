function ChatUI(chat){
  this.chat = chat;
  $('#chatButton').on('click', this.getMessage.bind(this)); 
};
  

ChatUI.prototype.getMessage = function (event){
    event.preventDefault();
    var message = $('#chatbox').val();
    if (message.substring(0, 1) === '/') {
      this.processCommand(message);
    } else {
      this.chat.sendMessage(message);
    }
      $('#chatbox').val("");    
};

ChatUI.prototype.processCommand = function(message) {
  if (message.substring(0, 5) === '/nick') {
    this.chat.updateNickname(message.slice(6));
  } else {
    this.displayMessage({user: "System", text: "Sorry, cannot process command"});
  }
};

ChatUI.prototype.displayMessage = function (data) {
  $('.messages').append("<div class='single-message-row'> </div>");
  $('.single-message-row').last().text(data.user + ": " + data.text);
};
