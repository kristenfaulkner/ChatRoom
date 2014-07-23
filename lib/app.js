var chat = require('./chat_server');
var fs = require('fs');
var static = require('node-static');
var file = new static.Server('../public');

// function handler (req, res) {
//   fs.readFile('../public/index.html', function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }
//     res.writeHead(200);
//     res.end(data);
//   });
// }

var server = require('http').createServer(function(req, res) {
  req.addListener('end', function () {
      file.serve(req, res);
  }).resume();
});

server.listen(8000);

chat.createChat(server);

//
// var io = socketio(server);
// io.on('connection', function(socket) {
//   console.log("new connection");
//
//   socket.emit('from_node_event', {message: "Hi from node!"});
//   //incoming message from 1 user
//   socket.on("from_browser_event", function(data) {
//     console.log(data);
//
//     //broadcast that message to everyone connected
//     io.sockets.emit('from_node_event', {message: data.message});
//   });
// });