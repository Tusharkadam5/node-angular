'use strict';
/**
 * Module dependencies.
 */
//var passport = require('passport'),
 var LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('reg_user');

module.exports = function (mongoose, passport){
  // Use local strategy
  passport.use('local-client', new LocalStrategy({usernameField:'email', passwordField:'password'},
  function (username, password, done) {
    User.findOne({
      email: username.toLowerCase()
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid username or password'
        });
      }

      return done(null, user);
    });
  }));
};