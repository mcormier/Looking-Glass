var http = require('http');
var fs = require('fs');
var url = require('url');

var port = 8080;
var socketServer;

function handlePost(req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('POST recieved');
  if (socketServer) {
    socketServer.sendMessage("post");    
  }

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
