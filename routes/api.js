var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/schedulize');
var companies = db.get('companies');
var users = db.get('users');

router.param('companyId', function(req, res, next, code){

});

router.param('userId', function(req, res, next, code){
	users.findOne({_id: code}).on('success', function(doc){
      req.user = doc;
      next();
	});
});

router.get('/companies/:companyId/', function(req, res){

});


router.get('/companies/:companyId/users', function(req, res){

});

router.get('/users', function(req, res){
	users.find({}).on('success', function(docs){
		res.send(200, docs);
	});
});

router.get('/users/:userId', function(req, res){
	res.send(req.user);
});

router.post('/users/:userId/availability', function(req, res){
	
});

// To be deleted when Ids are set up
router.post('/users/availability', function(req, res){
  console.log("woo!");
  console.log(req.data);
});

router.get('/users/availabilty', function(req, res){

});

router.post('/logout', function(req, res){
	req.session.destroy(function(){
    res.redirect('/');
  });
});


module.exports = router;
