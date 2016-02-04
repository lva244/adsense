process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_MODULES_CACHE=false;

var express = require('./config/express');
	
var app = express();
app.listen(process.env.PORT || 3000);
module.exports = app;

console.log("Server running at http://localhost:3000/");