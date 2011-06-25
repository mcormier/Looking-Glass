var requestHandlers = require("./requestHandlers");
var router = require("./router");
var webServer = require('./webServer.js');
var socketServer = require('./wsServer.js');



var handle = {};
handle["/"] = requestHandlers.index;


socketServer.start();

webServer.webSocketServer(socketServer);
webServer.start(router.route, handle);
