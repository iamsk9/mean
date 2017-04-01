var q = require('q');

var moment = require('moment');

var db = require('../../../mysqldb');

var emailer = require('../../emailer');

var config = require('../../../config/config');

var bcrypt = require('bcrypt-nodejs');

var utils  = require('../../utils');

var SALT_WORK_FACTOR = 19204;

exports.getProposalsCount = function () {
	var proposalsCountDefer = q.defer();
	var proposalsAddedToday = "SELECT count(*) as proposalsCount from proposals"
	db.getConnection().then(function(connection) {
		connection.query(proposalsAddedToday, function(err, results) {
			if(err) {
				connection.release();
				proposalsCountDefer.reject(err);
			}
			if(results.length > 0) {
				obj.proposalsCount = results[0].proposalsCount;
			} else {
				obj.proposalsCount = 0;
			}
			connection.release();
			proposalsCountDefer.resolve();
		})
	}, function(err) {
		proposalsCountDefer.reject(err);
	});
	return proposalsCountDefer.promise;
}

exports.getOrganizationsCount = function () {
	var organisationsCountDefer = q.defer();
	var organisationsAddedToday = "SELECT count(*) as organisationsCount from organisations"
	db.getConnection().then(function(connection) {
		connection.query(organisationsAddedToday, function(err, results) {
			if(err) {
				connection.release();
				organisationsCountDefer.reject(err);
			}
			if(results.length > 0) {
				obj.organisationsCount = results[0].organisationsCount;
			} else {
				obj.organisationsCount = 0;
			}
			connection.release();
			organisationsCountDefer.resolve();
		})
	}, function(err) {
		organisationsCountDefer.reject(err);
	});
	return organisationsCountDefer.promise;
}