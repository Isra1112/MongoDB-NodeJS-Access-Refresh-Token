const http = require("http");
const express = require("express");
//const logEvent = require('.')
const appRoutes = require('../src/routes/index.routes')
const appMiddleware = require('../src/middlewares/app-middlewares')


const app = express();
app.use(appMiddleware);
app.use(appRoutes);
const server = http.createServer(app);
server.on('error',function(e){
    console.log('APP Failed');
});

module.exports = server;