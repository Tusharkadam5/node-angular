 var mongoose = require('mongoose');
var User = mongoose.model('User');
//var Usertask = require('mongoose').model('Usertask');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var moment = require('moment');


var getErrorMessage = function(err) {
	var message = '';
   
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}
	else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}

	return message;
};

// load inadex page here
exports.render = function(req, res) {
    res.render('index', {
    	title: 'Home',
    	user: req.user ? req.user.name : '',
        messages:'' //req.flash('error') || req.flash('info')
    });
   
};


/**
 * Register User
 */
exports.register = function(req, res, next) {

            if (req.body.password === req.body.confirmpass) {
                if (req.body.password.length > 6) {
                  var user = new User({
                            email              : req.body.email,
                            password           : req.body.password,
                            name               : req.body.name,
                            gender             : req.body.gender
                            //created_date       : Date.now,
                            //updated            : { type: Date, default: null },
                    });

                    user.save(function(err) {
                            if (err) {
                                var message = getErrorMessage(err);
								return res.status(500).send({ 
                                        success: false, 
                                        message: message
                                        });
                            }

                            return res.status(200).send({ 
                            success: true, 
                            message: 'Your account has been created.'
                            });
                          
                        });
                }else{

                    console.log("password length should be mour than 6 carector");
                    return res.status(401).send({ 
                            success: false, 
                            message: 'password length should be mour than 6 carector.'
                            });
                }    
                
            }else {
               console.log("Not confirmed password");
               return res.status(401).send({ 
                            success: false, 
                            message: 'Not confirmed password.'
                            });
            }
                
	
};


/**
 * User Logout
 */
exports.logout = function(req, res) {
	if (req.user) {
		//tokenManager.expireToken(req.headers);
                //delete req.decoded;
		delete req.user;	
		return res.sendStatus(200);
	}
	else {
		return res.sendStatus(401);
	}
};


/**
 * User Login
 */
exports.signin = function(req, res){
        var email = req.body.email || '';
	var password = req.body.password || '';
	
	if (email == '' || password == '') { 
		 return res.status(401).send({ 
			success: false, 
			message: 'Please enter the blank field.'
                        });
	}

	User.findOne({email: email}, function (err, user) {
		if (err) {
			console.log(err);
                        return res.status(401).send({ 
			success: false, 
			message: 'Authentication failed. Wrong password.'
                        });
		}

		if (user == undefined) {
			//return res.sendStatus(401);
			return res.status(401).send({ 
			success: false, 
			message: 'User not found.'
			});
                      
		}
		
		 
			if (user.comparePassword(password)) {
                            delete user.password;
                            delete user.password;
                            
                         
                            var token = createJwtToken(user);
                            req.user = user;
                            return res.json({ success: true, message: 'You have successfully logged in!', token: token });
                              
                                
                        }else{
                                console.log("Attempt failed to login with " + user.name);
								//return res.sendStatus(401);
                                 return res.status(401).send({ 
                                    success: false, 
                                    message: "Attempt failed to login with " + user.name
                                    });
                        }

			
		

	});
};

/**
 * Middleware for Check user is admin or user 
 */
exports.isUser = function (req, res, next) {
//console.log(req.user);
    var usr = req.user.user || req.user;
    if (usr) {

       if (usr.roles === 'user') {
         return next();
       } else {
         return res.status(401).send({ 
                            success: false, 
                            message: 'Permissions not allwed.'
                            });
       }
    } else {
      return res.status(401).send({ 
                            success: false, 
                            message: 'you need to login with admin creadinstiol.'
                            });
    }
};


/**
 * Create token 
 */
function createJwtToken(user) {

  var payload = {
    user: user,
    jti: "aa7f8daa7f8d0a95c0a95c",
    iat: moment().add().valueOf(),
    exp:  moment().add('minutes', 1).valueOf()
  };
  return jwt.sign(payload, config.secret);
}

