var q = require('q');

var moment = require('moment');

var db = require('../../../mysqldb');

var emailer = require('../../emailer');

var config = require('../../../config/config');

var bcrypt = require('bcrypt-nodejs');

var utils  = require('../../utils');

var SALT_WORK_FACTOR = 19204;

exports.submitProposal = function(req) {
	var submitProposalDeferred = q.defer();
	var conn;
	var insertproposal = "INSERT INTO proposals (name, org_id, doc, message, status, min_fund, researcher_id, created_at, modified_at) VALUES (?,?,?,?,?,?,?,?,?)";
	db.getConnection().then(function(connection) {
	   console.log("Inside");
		 conn = connection;
		 return utils.runQuery(conn, insertproposal, [req.name, req.org_id, req.doc, req.message, 1, req.min_fund, req.researcher_id,
			 moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')], true);
	 }).then(function() {
		 var query = "SELECT max(id) as proID from proposals where deleted_at is NULL";
		 return utils.runQuery(conn, query, true)
	 }).then(function(result) {
		 var id = result[0].proID;
		 var sendNotification = "INSERT INTO notifications (pro_id, not_name, not_read, org_id, created_at, modified_at) VALUES (?,?,?,?,?,?)";
		 return utils.runQuery(conn, sendNotification, [id, req.name, 0, req.org_id,
			 moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')], true);
	 }).then(function(){
		 submitProposalDeferred.resolve();
	 }).catch(function(err) {
			 submitProposalDeferred.reject(err);
	 });
	 return submitProposalDeferred.promise;
}
exports.getPreviousproposals = function(req) {
	var getPreviousproposalsDefer = q.defer();
	var query = "SELECT * from proposals";
	db.getConnection().then(function(connection) {
		return utils.runQuery(connection, query, req);
	}).then(function(results) {
		getPreviousproposalsDefer.resolve(results);
	}).catch(function(err) {
		getPreviousproposalsDefer.reject(err);
	});
	return getPreviousproposalsDefer.promise;
}
