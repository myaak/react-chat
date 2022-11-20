"use strict";
var express = require('express');
var Server = require('socket.io').Server;
var helmet = require('helmet');
var app = express();
var server = require("http").createServer(app);
var io = new Server(server, {
    cors: {
        origin: "https://localhost:3000",
        credentials: "true"
    }
});
app.use(helmet());
app.use(express.json());
app.get('/', function (req, res) {
    console.log(req);
    res.json('hi');
});
io.on("connect", function (socket) {
    console.log(socket);
});
server.listen(4000, function () {
    console.log("Listening on port 4000");
});
