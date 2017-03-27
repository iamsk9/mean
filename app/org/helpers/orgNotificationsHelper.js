var q = require('q');

var moment = require('moment');

var db = require('../../../mysqldb');

var utils  = require('../../utils');

exports.getNotifications = function() {
	var getNotificationsDefer = q.defer();
	var query = "SELECT noti.id, noti.not_name, re.researcher_name, noti.not_read from notifications noti INNER JOIN proposals pro ON noti.pro_id = pro.id INNER JOIN researcher re ON re.id = pro.researcher_id where noti.deleted_at is NULL and pro.deleted_at is NULL and noti.org_id = ?";
	db.getConnection().then(function(connection) {
		return utils.runQuery(connection, query, 2);
	}).then(function(results) {
		getNotificationsDefer.resolve(results);
	}).catch(function(err) {
		getNotificationsDefer.reject(err);
	});
	return getNotificationsDefer.promise;
}
