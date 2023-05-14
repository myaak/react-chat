"use strict";
var Pool = require('pg').Pool;
require('dotenv').config();
var pool = new Pool({
    database: process.env.databaseName,
    host: process.env.databaseHost,
    password: process.env.databasePassword,
    user: process.env.databaseUser,
    port: process.env.databasePort
});
module.exports = pool;
