var q = require('q');

var moment = require('moment');

var db = require('../../../mysqldb');

var emailer = require('../../emailer');

var config = require('../../../config/config');

var bcrypt = require('bcrypt-nodejs');

var utils  = require('../../utils');

var SALT_WORK_FACTOR = 19204;

exports.registerResearcher = function(req) {
	var registerResearcherDeferred = q.defer();
	var conn;
	var register = "INSERT INTO researcher(researcher_name, email, phone_number, nationality, state, city, organisation, gender, password, created_at, deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
	
	db.getConnection().then(function(connection) {
	    console.log("Inside");
		conn = connection;
		return utils.runQuery(conn,register,[req.name, req.email, req.mobile, req.nationality,
			 req.state,req.city,req.organisation,req.gender,req.password,
		moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')], true);	 
	 }).then(function(){
		 registerResearcherDeferred.resolve();
	 }).catch(function(err) {
			 registerResearcherDeferred.reject(err);
	 });
	 return registerResearcherDeferred.promise;
}
