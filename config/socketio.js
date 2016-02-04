var config = require('./config'),
    passport = require('passport');
    
module.exports = function(server, io){
    io.on('connection', function(socket){
        require('../app/controllers/chat.server.controller')(io, socket);
    });
};