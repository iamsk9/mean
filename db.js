var mongoose = require('mongoose');
var q = require('q');

exports.getConnection = function(){
  mongoose.connect('mongodb://localhost:27017/mean3');
  console.log("Connected Successfully..!");
}
