var q = require('q');

var moment = require('moment');

var db = require('../../../mysqldb');

var emailer = require('../../emailer');

var config = require('../../../config/config');

var bcrypt = require('bcrypt-nodejs');

var utils  = require('../../utils');

var SALT_WORK_FACTOR = 19204;

exports.getDashboardDetailsOrg = function(req) {
	var getDashboardDeferred = q.defer();
	var conn;
	var results = {};
	db.getConnection().then(function(connection) {
		conn = connection;
		var query = "SELECT max(id) as proID from proposals where deleted_at is NULL AND org_id = ?";
		return utils.runQuery(conn, query, req, true);
	}).then(function(result) {
		results.noofproposals = result[0].proID;
		console.log("int the helper");
		console.log(results.noofproposals);
		 var query = "SELECT count(*) as orgcount from organisations";
		 return utils.runQuery(conn, query, true)
	 }).then(function(result) {
		 results.nooforganizations = result[0].orgcount;
	 }).then(function(){
		 getDashboardDeferred.resolve(results);
	 }).catch(function(err) {
			 getDashboardDeferred.reject(err);
	 });
	 return getDashboardDeferred.promise;
}
