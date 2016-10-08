// - Main Controller
var jsonfile = require('jsonfile');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

exports.get404 = function(req, res) {
	res.render('error');
}

exports.getLandingPage = function(req, res) {
  	res.render('index');
};

exports.getCrData = function(req, res) {
  	var file = 'public/det_open_data/pr_agg.json';
  	console.log('path: ' + file);

  	jsonfile.readFile(file, function(err, obj) {
    if (err) {
      res.json({status: 'error', reason: err.toString()});
      return;
    }

    res.json(obj);
  });
}

exports.insertSafeData = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
          res.end(JSON.stringify({success: false}));
      } 
      else {
          console.log('Connection established to', url);
          var collection = db.collection('safe_spots');
          collection.insert([req.body], function (err, result) {
            if (err) {
              console.log(err);
              res.end(JSON.stringify({success: false}));
            } else {
              console.log('Inserted %d documents into the "posts" collection. The documents inserted with "_id" are:', result.length, result);
              res.end(JSON.stringify({success: true}));
            }
            db.close();
          });
      }
  });
}

exports.getSafeData = function(req, res) {
  var def = [];

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
      res.render('blog', {posts: def});
    } else {
      console.log('Connection established to', url);
      var collection = db.collection('safe_spots');
      collection.find().toArray(function (err, result) {
        if (err) {
          console.log(err);
          res.json({posts: def});
        } else if (result.length) {
          console.log('Found:', result);
          res.json({posts: result});
        } else {
          console.log('Found:', result);
          console.log('No document(s) found with defined "find" criteria!');
          res.json({posts: def});
        }
        //Close connection
        db.close();
        
      });
    }
  });
}