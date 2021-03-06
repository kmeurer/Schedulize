//DATABASE DECLARATIONS
var mongo = require('mongodb');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

var mongodbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/schedulize';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);
var db = mongoose.connection;
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

db.on('error', console.error.bind(console, 'connection error:'));
// Create Schema for our three collections
db.once('open', function callback () {
	console.log("Connected to database");
});

var _userSchema = new Schema({
	name: String,
	email: String,
	password: String,
	companies: [{type: ObjectId, ref: 'Company'}],
	shiftsDesired: Number,
	shiftsAssigned: Number,
	availability: [{}],
	eligibleRoles: [String],
	isAdmin: Boolean,
	joinDate: { type: Date, default: Date.now }
});

var _companySchema = new Schema({
	name: String,
	employees: [{type: ObjectId, ref: 'User'}],
	admins: [{type: ObjectId, ref: 'User'}],
	schedules: [{type: ObjectId, ref: 'Schedule'}],
	accessKey: String
});

var _scheduleSchema = new Schema({
	name: String,
	companyId: {type: ObjectId, ref: 'Company'},
	shifts: [{}],
	createdBy: String,
	createdAt: { type: Date, default: Date.now },
	totalShifts: Number,
	shiftsAssigned: Number,
	employees: [{type: ObjectId, ref: 'User'}],
	roles: [{}]
});

var User = mongoose.model('User', _userSchema);
var Company = mongoose.model('Company', _companySchema);
var Schedule = mongoose.model('Schedule', _scheduleSchema);

module.exports = {
	userSchema: _userSchema,
	User: User,
	companySchema: _companySchema,
	Company: Company,
	scheduleSchema: _scheduleSchema,
	Schedule: Schedule
};