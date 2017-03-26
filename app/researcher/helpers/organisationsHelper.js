var q = require('q');

var moment = require('moment');

var db = require('../../../mysqldb');

var utils  = require('../../utils');

exports.getOrganisations = function() {
	var getOrganisationsDefer = q.defer();
	var query = "SELECT id, org_name from organisations where deleted_at is NULL";
	db.getConnection().then(function(connection) {
		return utils.runQuery(connection, query);
	}).then(function(results) {
		getOrganisationsDefer.resolve(results);
	}).catch(function(err) {
		getOrganisationsDefer.reject(err);
	});
	return getOrganisationsDefer.promise;
}
