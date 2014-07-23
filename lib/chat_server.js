var createChat = function(server) {
  var socketio = require('socket.io');
  var io = socketio.listen(server);
  var guest_users = 0;
  var usernames = {};
  var current_rooms = {};
  var user_rooms = {};

  
  function current_users() {
    var current_users = []
    for (var key in usernames) {
      current_users.push(usernames[key]);
    }
      return current_users;
  };
  
  function joinRoom(socket, room) {
    current_rooms[room] = current_rooms[room] || [];
    current_rooms[room].push(usernames[socket.id]);
    user_rooms[socket.id] = room;
  };
  
  function updateNickname(data, socket) {
    var flag = false;
    for (var key in usernames){
      if (usernames[key] === data.nickname || (data.nickname.indexOf("Guest") != -1)){
        flag = true;
       }
    };
    if (flag){
      socket.emit('message_from_server', {text: 'System -- Name was taken', user: 'System'});
    } else {
      
      usernames[socket.id] = data.nickname;
      socket.emit("message_from_server", 
        {text: 'Your username has been changed to ' + data.nickname + "!", user: 'System'});
       io.sockets.emit('list_of_users', {users: current_users() });
    };
  };
  
  io.on('connection', function (socket) {
    
    function room() {
      return current_rooms[user_rooms[socket.id]];
    };
    
    console.log("connected with the server");
    guest_users ++;
    usernames[socket.id] = "Guest #" + guest_users;
    joinRoom(socket, 1);
    io.sockets.emit('list_of_users', {users: room(socket)});

    socket.on('update_nickname', function(data) {
      updateNickname(data, socket);
    });
    
    socket.on('message_from_client', function (data) {
      io.sockets.emit('message_from_server', {text: data.text, user: usernames[socket.id]});
    });
    
    io.on('disconnect', function(socket) {
      guest_users--;
      usernames[socket.id] = null;
    })
    
    // socket.on('disconnect', function() {
//       // delete usernames[socket];
//     });
    
  
  });
}



exports.createChat = createChat;
