// - Main Controller
var jsonfile = require('jsonfile');

var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
//var url = 'mongodb://localhost:27017/test';

exports.get404 = function(req, res) {
	res.render('error');
}

exports.getLandingPage = function(req, res) {
  	res.render('index');
};

exports.getCrData = function(req, res) {
  	var file = 'public/det_open_data/data.json';
  	console.log('path: ' + file);

  	jsonfile.readFile(file, function(err, obj) {
    if (err) {
      res.json({status: 'error', reason: err.toString()});
      return;
    }

    res.json(obj);
  });
}
