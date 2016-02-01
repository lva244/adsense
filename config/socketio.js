var config = require('./config'),
    cookieParser = require('cookie-parser'),
    passport = require('passport');
    
module.exports = function(server, io, mongoStore){
    io.on('connection', function(socket){
        require('../app/controllers/chat.server.controller')(io, socket);
    });
};