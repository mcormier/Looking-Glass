var http = require('http');
var fs = require('fs');
var url = require('url');

var port = 8080;
var socketServer;


function getPostData(data) {
  console.log("Recieved some data: " + data);
  if ( socketServer) {
    // data is a Buffer object
    socketServer.sendMessage( data.toString() );    
  }
}

// Node receives the POST data in chunks and fires the "data" event for each chunk. 
// http://jnjnjn.com/113/node-js-for-noobs-grabbing-post-content/
// With only a little bit of traffic, that first chunk would always 
// contain everything we needed. But once the traffic got crazy, we were 
// only getting one piece of the request.
function handlePost(req, res) {

  req.addListener("data", getPostData);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('POST recieved');
}

function webSocketServer(server) {
  socketServer = server;
}


function start(route, handle) {

  // Wrap onRequest so it can access route and handle
  // This is a closure...
  function onRequest(req, res) {

    if ( req.method == 'POST' ) {
      handlePost(req, res);
      return;
    }

    function readFileCallback(err, data) {
     if(err) {
      res.writeHead(404);
      res.end();
      return;
     }

     // TODO -- return text/javascript for *.js files
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(data);
    }

  
    var pathname = url.parse(req.url).pathname;

    var responseFile = route(handle, pathname);
 
    var data; 
    try {
      data = fs.readFile(responseFile, 'utf8', readFileCallback);
    } catch (err) {
      console.log("Caught error");
      res.writeHead(404);
      return;
    }


    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.end(data);
  }


  server = http.createServer(onRequest);
  server.listen(port);
  console.log("Web server started on port " + port);
}


exports.start = start;
exports.webSocketServer = webSocketServer;
