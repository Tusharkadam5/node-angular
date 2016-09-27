var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// User tasks Schema here
var usertask = new mongoose.Schema({  
	notes               : { type: String, required:true },
	date                : { type: Date, default: Date.now },
	time       			: { type: String },
	user				: { type: Schema.ObjectId, ref: 'User' }
});

var profile = mongoose.model('Usertask', usertask); 