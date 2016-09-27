 var mongoose = require('mongoose');
var User = mongoose.model('User');
var Usertask = require('mongoose').model('Usertask');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var moment = require('moment');


var getErrorMessage = function(err) {
	var message = '';
   
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Already exists';
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


exports.reportList = function(req, res, next) {
    Usertask.find().sort('-date').populate('user').exec(function (err, reports) {
	//Usertask.find({}, function(err, users) {
		if (err) {
			//return next(err);
			return res.status(401).send({ 
			success: false, 
			message: err
                        });
		}
		else {
                    
		return res.json(reports);
                      
		}
	});
};

/**
 * Create an Report
 */
exports.createReport = function(req, res, next){
	console.log(req.body)
	var usertask = new Usertask(req.body);

		usertask.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				return res.status(500).send({ 
						success: false, 
						message: message
						});
			}

			return res.status(200).send({ 
			success: true, 
			message: 'Reporte has been created.'
			});
		  
		});
};




/**
 * Update an Report
 */
exports.update = function (req, res) {
  var report = req.report;
//var usertask = new Usertask(req.body);
  report.date = req.body.date;
  report.time = req.body.time;
  report.notes = req.body.notes;
  

  report.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
		success: false
      });
    } else {
      res.json(report);
    }
  });
};

exports.read = function (req, res) {
  // convert mongoose document to JSON
  var report = req.report ? req.report.toJSON() : {};

  // Add a custom field to the Report, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Report model.
  report.isCurrentUserOwner = !!(req.user && report.user && report.user._id.toString() === req.user._id.toString());

  res.json(report);
};


/**
 * Delete an report
 */
exports.delete = function (req, res) {
  var report = req.report;

  report.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
		success: false
      });
    } else {
      res.json(report);
    }
  });
};

/**
 * List of reports
 */
exports.list = function (req, res) {
  Usertask.find().sort('-date').populate('user', 'name').exec(function (err, reports) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
		success: false
      });
    } else {
      res.json(reports);
    }
  });
};


/**
 * Report middleware
 */
exports.reportByID = function (req, res, next, reportId) {

  if (!mongoose.Types.ObjectId.isValid(reportId)) {
    return res.status(400).send({
      message: 'Report is invalid'
    });
  }

  Usertask.findById(reportId).populate('user', 'name').exec(function (err, report) {
    if (err) {
      return next(err);
    } else if (!report) {
      return res.status(404).send({
        message: 'No report with that identifier has been found'
      });
    }
    req.report = report;
	//return res.json(reports);
    next();
  });
};
