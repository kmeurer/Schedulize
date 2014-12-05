var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/schedulize');
var shifts = db.get('shifts');
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


router.post('/shifts', function(req, res){
  console.log("Made it here");
  var time = req.body.time,
      day = req.body.day,
      endDay = req.body.endDay;
      type = req.body.type,
      restricted = req.body.restricted;
  console.log( "REQ BODY IS", req.body );
  shifts.insert({ time: time, day: day, endDay: endDay, type: type, restricted: restricted }).on('success', function(docs, err){
    if(err) throw err;
    res.send(201, docs);
  });
});

router.get('/shifts', function(req, res){
  shifts.find({}).on('success', function(docs){
    res.send(200, docs);
  });
})

// To be deleted when Ids are set up
router.post('/users/availability', function(req, res){
  var availability = req.body.availability,
      name = req.body.name,
      canManage = req.body.canManage || false,
      shiftsDesired = req.body.shiftsDesired;
  users.insert({ name: name, availability: availability, shiftsDesired: shiftsDesired, canManage: canManage }).on('success', function(doc, err){
  	if (err) throw err;
    res.send(201, doc);
  });
});

router.get('/users', function(req, res){
	users.find({}).on('success', function(docs){
    res.send(200, docs);
	});
});

router.post('/logout', function(req, res){
	req.session.destroy(function(){
    res.redirect('/');
  });
});


module.exports = router;