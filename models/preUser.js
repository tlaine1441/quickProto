// require mongoose
var mongoose = require('mongoose');

// create event schema 
var PreUserSchema = mongoose.Schema({
	number: String
});

// create model and export event model
module.exports = mongoose.model('PreUser', PreUserSchema);
