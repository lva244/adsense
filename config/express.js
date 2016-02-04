var config = require('./config'), 
    http = require('http'),
    socketio = require('socket.io'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    methodOverride = require('method-override');
    passport = require('passport');
    
module.exports = function(db){
    var app = express();
    var server = http.createServer(app);
    var io = socketio.listen(server);
	
	if(process.env.NODE_ENV === 'development')
	{
		app.use(morgan('dev'));
	} else if(process.env.NODE_ENV === 'production')
	{
		app.use(compress);
	}
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
    
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
	
	app.set('views', './app/views');
	app.set('view engine', 'ejs');
	
    require('../app/routes/index.server.route.js')(app);
    require('./socketio')(server, io);
    
    app.use(express.static('./public'));
    
    return server;
};