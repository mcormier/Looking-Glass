var io = require('socket.io');
var port = 9999;

var fakeDocument = "";
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

// TODO - separate document and command logic from server
// For POC assume a one line document
function parseMessage(message) {
  var tokens = message.split(" ");
  var command = tokens[0];
  //console.log("Command is : " + command );
  if ( command == 'il' ) {
     // ignore line value for now
     var col = tokens[2];
     //console.log("Perform command at column: " + col);
     //console.log("Token Count is : " + tokens.length);
     var value;
     // A space was sent
     if ( tokens.length != 4 ) {
       value = " ";
     } else {
       value = tokens[3];
     }


     //insert value at column 
     fakeDocument = fakeDocument.substr(0,col) + value + fakeDocument.substr(col); 
  }
  if ( command == 'reset' ) {
    fakeDocument = "";
  }

  return fakeDocument;
}

function sendMessage(message) {
  parseMessage(message);
  console.log(message);
  // wsServer.sockets.emit('edit', { change : message } );
  wsServer.sockets.emit('edit', { change : fakeDocument } );
}

console.log('wsServer.js loaded');

exports.start = start;
exports.sendMessage = sendMessage;
