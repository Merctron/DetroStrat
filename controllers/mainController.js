// - Main Controller

var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
//var url = 'mongodb://localhost:27017/test';

exports.get404 = function(req, res) {
	res.render('error');
}

exports.getLandingPage = function(req, res) {
  res.render('index');
};
