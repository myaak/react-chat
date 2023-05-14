"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var Server = require('socket.io').Server;
var app = express();
var helmet = require('helmet');
var session = require('express-session');
var authRouter = require('./authRouter');
var changeProps = require('./changeProps');
var messages = require('./messages');
require("dotenv").config();
var server = require("http").createServer(app);
var io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: "true"
    }
});
app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUnitialised: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production",
        httpOnly: true,
        expires: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax"
    }
}));
app.use('/auth', authRouter);
app.use('/modify', changeProps);
app.use('/message', messages);
//@ts-ignore
app.get('/', function (req, res) {
    res.json('hi');
});
io.on("connect", function (socket) {
    console.log(socket);
});
//server.listen(4000, () => {
//  console.log("Listening on port 4000")
//})
server.listen(4000, function () {
    console.log('listen 4000');
});
