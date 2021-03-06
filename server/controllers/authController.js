var db = require('../config/dbSchema');
var User = db.User;
var Company = db.Company;
var bcrypt = require('bcrypt');
var passport = require('passport');

module.exports = {
	isLoggedInUser: function(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    } else {

    // if they aren't redirect them to the login page
    console.log('not logged in');
    res.render('public/login', {error: "Please log in to continue."});
    }
  },

  logoutUser: function(req, res){
    req.logout();
    res.redirect('/');
  },

  isLoggedInAdmin: function(req, res, next){
    if( req.isAuthenticated()) {
      if(req.user.isAdmin){
        return next();
      } else {
        res.render('public/insufficientPrivileges');
      }
    } else {
      res.render('public/login', {error: "Please log in to continue."});
    }
  },

  createNewEmployee: function(req, res){
		if(req.body.password !== req.body.password2){
			res.redirect('/signup');
		} else {
      // Determine if company exists
      Company.findOne({name: req.body.companyName}, function(err, company){
        if(!company){ 
          res.redirect('/signup');
        } else {
          // check company access key
          bcrypt.compare(req.body.companyAccessKey, company.accessKey, function(err, result) {
            if(!result){
              res.redirect('/signup');
            } else {
              // Hash the given password
              bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(req.body.password, salt, function(err, hash) {
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
                    eligibleRoles: [],
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
            }
          });
        }   
      });
		}
	},

	createNewCompany: function(req, res){
    if(req.body.companyAccessKey !== req.body.companyAccessKey2){
      res.render('public/signup', {error2: "Access keys do not match"});
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if(err){
            console.log('Failed to hash password');
            res.status(500).send(err);
          }
          // create a new user
          var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            companies: [],
            shiftsDesired: null,
            shiftsAssigned: 0,
            availability: null,
            eligibleRoles: [],
            isAdmin: true,
            joinDate: new Date()
          });
          // Save new user
          newUser.save(function(err, user){
            console.log("new user saved");
            bcrypt.genSalt(10, function(err, salt2) {
              bcrypt.hash(req.body.companyAccessKey, salt2, function(err, accessHash) {
                console.log("user password hashed");
                var newCompany = new Company({
                  name: req.body.companyName,
                  employees: [user._id],
                  admins: [user._id],
                  schedules: [],
                  accessKey: accessHash
                });
                newCompany.save(function(err, company){
                  if (err) {
                    res.status(500).send(err);
                  }
                  user.companies.push(company._id);
                  user.save(function(err, updatedUser){
                    passport.authenticate('local')(req, res, function(){
                      res.redirect('/admin');
                    });
                  });
                });
              });
            });
          });
        });
      });
    } // end of else statement
	}
};