var io = require('socket.io');
var port = 9999;

var fakeDocument = "This is the document";
var wsServer; 

function start() {
  wsServer = io.listen(port);

  function devConfiguration() {
    // Logger setting  
    // 3 = debug
    wsServer.set('log level', 2);
  }

  wsServer.configure('development', devConfiguration );

  console.log('Socket io running at http://127.0.0.1:' + port );
  wsServer.sockets.on('connection', handleWSConn );  
}


function handleWSConn(socket) {
  // TODO -- transmit the current document.
  socket.emit('startUp', { document : fakeDocument });

  socket.on('SendComment', function (data) {
    console.log(data);
  });

}

function sendMessage(message) {
  console.log("TODO -- implement send to all clients: " + message);
  if (wsServer) {
    console.log("WS not null");
  }
  //wsServer.emit('edit', { everyone: 'in', change : '1 1 i' } );
  wsServer.sockets.emit('edit', { change : "1 1 i" } );
  console.log("After emit");
}

console.log('wsServer.js loaded');

exports.start = start;
exports.sendMessage = sendMessage;
