'use strict'
const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;
const bodyParser = require('body-parser'); 

app.use(bodyParser()); 

// require routes from routes config
var routes = require('./config/routes');
app.use(routes);


// serve public front end files from public
app.use(express.static(__dirname + '/public'));

// start server
app.listen(port, function() {
  console.log('Server started on', port); 
});