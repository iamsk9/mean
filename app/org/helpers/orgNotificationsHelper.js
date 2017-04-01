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

exports.addNews = function(req) {
	var addNewsDeferred = q.defer();
	var conn;
	var addNewsQuery = "INSERT INTO news(name, details, org_id, max_fund, min_fund, last_date, created_at, modified_at) VALUES (?,?,?,?,?,?,?,?)";

	db.getConnection().then(function(connection) {
			console.log("asdgasdg");
			console.log(req);
			connection.query(addNewsQuery, [req.name, req.details, req.org_id, req.max_fund, req.min_fund,
				 req.last_date, moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')]
			, function(err, results) {
				console.log("query");
				if(err) {
					addNewsDeferred.reject(err);
					connection.release();
					return;
				}
				addNewsDeferred.resolve();
				connection.release();
				console.log("News Added successfully");
			});
	}, function(err) {
		addNewsDeferred.reject(err);
	});
	return addNewsDeferred.promise;
}
