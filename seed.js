// require models
var db = require("./models");

// remove all records that match {} -- which means remove ALL records
db.PreUser.remove({}, function(err, books){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all');

    db.PreUser.create({number: process.env.NUMBER}, function(err, train){
      if (err) { return console.log('err', err); }
      console.log("created", train);
      process.exit();
    });
  }
});