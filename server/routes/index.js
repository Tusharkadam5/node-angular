var index = require('../controllers/user');
var report = require('../controllers/report');
var tokenManager = require('../config/token_manager');
var config = require('../config/config');
var express = require('express');
var router = express.Router();


module.exports = function(app) {

    app.route('/').get(index.render);


    app.route('/login').post(index.signin);
    app.route('/register').post(index.register);
   
    app.route('/logout').get(tokenManager.verifyToken, index.logout);
	//app.route('/home').get(tokenManager.verifyToken, index.isUser, report.reportList);
    
	  // Reports collection routes
    app.route('/api/reports').all(tokenManager.verifyToken)
      .get(report.list)
      .post(report.createReport);

  // Single article routes
    app.route('/api/reports/:reportId').all(tokenManager.verifyToken)
      .get(report.read)
      .put(report.update)
      .delete(report.delete);
	
	  // Finish by binding the report middleware
	app.param('reportId', report.reportByID);

};

