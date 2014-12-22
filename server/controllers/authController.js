var db = require('../config/dbSchema');
var User = db.User;
var Company = db.Company;
var bcrypt = require('bcrypt');

module.exports = {
	createNewEmployee: function(req, res){
		if(req.body.password != req.body.password2){
			res.render('public/signup', {error: "Passwords do not match"})
		} else {
      // Determine if company exists
      Company.findOne({name: req.body.companyName}, function(err, company){
        if(err){ 
          res.render('public/signup'), {error: "The company you specified does not exist."}
        };
        // check company access key
        bcrypt.compare(req.body.companyAccessKey, company.accessKey, function(err, result) {
            if(err){
              res.render('public/signup'), {error: "Invalid Access Key for " + company.name}
            }
          // Hash the given password
          bcrypt.hash(req.body.password, null, null, function(err, hash) {
            if(err){
              console.log('Failed to hash password');
              res.status(500).send(err);
            }
            // if valid key, create a new user
            var newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              companies: [company._id],
              shiftsDesired: null,
              shiftsAssigned: 0,
              availability: null,
              isAdmin: false,
              joinDate: new Date()
            });
            // Save the new user
            newUser.save(function (err, user) {
              if (err) {
                res.status(500).send(err);
              }
              // Add user to list of company employees
              company.employees.push(user._id);
              company.save(function(err, updatedCompany){
                // log this user in
                passport.authenticate('local')(req, res, function () {
                  res.redirect('/user');
                });
              });
            });
          });
        });      
      });
		}
	},

	createNewCompany: function(req, res){
    var newCompany = new Company({
      name: String,
      employees: [{type: ObjectId, ref: 'User'}],
      admins: [{type: ObjectId, ref: 'User'}],
      schedules: [{type: ObjectId, ref: 'Schedule'}],
      accessKey: String
    });
	}
}