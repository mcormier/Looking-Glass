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

function parseMessage(message) {
  var tokens = message.split(" ");
  console.log("Command is : " + tokens[0] );
}

function sendMessage(message) {
  parseMessage(message);
  console.log(message);
  wsServer.sockets.emit('edit', { change : message } );
}

console.log('wsServer.js loaded');

exports.start = start;
exports.sendMessage = sendMessage;
