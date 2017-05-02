var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/brainless");

module.exports.PreUser = require('./preUser.js');
