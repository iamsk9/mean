var q = require('q');

var moment = require('moment');

var bcrypt = require('bcrypt-nodejs');

var db = require('../../../mysqldb');

var utils  = require('../../utils');

var SALT_WORK_FACTOR = 19204;


function generateHash(string) {
	var hashDefer = q.defer();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) hashDefer.reject(err);
        // hash the password using our new salt
        bcrypt.hash(string, salt, null, function(err, hash) {
            if (err) hashDefer.reject(err);
            // override the cleartext password with the hashed one
            hashDefer.resolve(hash);
        });
    });
    return hashDefer.promise;
}


function comparePassword(candidatePassword, dbPassword) {
	var comparePasswordDefer = q.defer();
	bcrypt.compare(candidatePassword, dbPassword, function(err, isMatch) {
        if (err) comparePasswordDefer.reject(err);
        comparePasswordDefer.resolve(isMatch);
    });
    return comparePasswordDefer.promise;
}


exports.authenticateOrg = function(req) {
	var authenticateOrgDefer = q.defer();
	db.getConnection().then(function(connection) {
		var query = 'SELECT * FROM organisations WHERE username = ?';
		connection.query(query, [req.body.username], function(err, results){
			if(err) {
				console.log(err);
				authenticateOrgDefer.reject(err);
				return;
			}
			if(results.length > 0) {
				var user = results[0];
				comparePassword(req.body.password, user.password).then(function(isMatch){
					if(isMatch) {
							var result = {
								id : user.id, username : user.username
							};
							authenticateOrgDefer.resolve(result);
					} else {
						authenticateOrgDefer.reject({errorCode : 1011});
					}
					connection.release();
				});
			} else {
				authenticateOrgDefer.reject({errorCode : 1010});
			}
		})
	});
	return authenticateOrgDefer.promise;
}


exports.getNotifications = function(req) {
	var getNotificationsDefer = q.defer();
	var query = "SELECT noti.id, noti.not_name, re.researcher_name, pro.status, noti.not_read, pro.id as pro_id, pro.message, re.id, pro.min_fund from notifications noti INNER JOIN proposals pro ON noti.pro_id = pro.id INNER JOIN researcher re ON re.id = pro.researcher_id where noti.deleted_at is NULL and pro.deleted_at is NULL and noti.org_id = ?";
	db.getConnection().then(function(connection) {
		return utils.runQuery(connection, query, req);
	}).then(function(results) {
		getNotificationsDefer.resolve(results);
	}).catch(function(err) {
		getNotificationsDefer.reject(err);
	});
	return getNotificationsDefer.promise;
}

exports.getNotificationsCount = function(req) {
	var getNotificationsCountDefer = q.defer();
	var query = "SELECT count(*) as len FROM notifications WHERE deleted_at is NULL AND not_read = 0 ";
	db.getConnection().then(function(connection) {
		return utils.runQuery(connection, query, req);
	}).then(function(results) {
		getNotificationsCountDefer.resolve(results[0].len);
	}).catch(function(err) {
		getNotificationsCountDefer.reject(err);
	});
	return getNotificationsCountDefer.promise;
}

exports.getNews = function(req) {
	var getNewsDefer = q.defer();
	var query = "SELECT * FROM news WHERE org_id = ?";
	db.getConnection().then(function(connection) {
		return utils.runQuery(connection, query, req);
	}).then(function(results) {
		getNewsDefer.resolve(results);
	}).catch(function(err) {
		getNewsDefer.reject(err);
	});
	return getNewsDefer.promise;
}

exports.addNews = function(req) {
	var addNewsDeferred = q.defer();
	var conn;
	var addNewsQuery = "INSERT INTO news(name, details, org_id, min_fund, last_date, created_at, modified_at) VALUES (?,?,?,?,?,?,?)";

	db.getConnection().then(function(connection) {
			console.log("asdgasdg");
			console.log(req);
			connection.query(addNewsQuery, [req.name, req.details, req.org_id, req.max_fund,
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

exports.sendNotification = function(req) {
	var sendNotificationDeferred = q.defer();
	var conn;
	var addQuery = "INSERT INTO orgNotifications(pro_id, not_name, not_read, message, org_id, created_at, modified_at) VALUES (?,?,?,?,?,?,?)";
	db.getConnection().then(function(connection) {
		 console.log("Inside");
		 conn = connection;
		 return utils.runQuery(conn, addQuery, [req.pro_id, req.not_name, 0, req.message, req.org_id,
			 moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')], true);
	 }).then(function() {
		 var sendNotification = "UPDATE proposals SET status = ? WHERE id = ?";
		 return utils.runQuery(conn, sendNotification, [req.status, req.org_id], true);
	 }).then(function(){
		 sendNotificationDeferred.resolve();
	 }).catch(function(err) {
			 sendNotificationDeferred.reject(err);
	 });
	 return sendNotificationDeferred.promise;
}

exports.addOrg = function(req) {

	var addOrgDeferred = q.defer();
	var conn;
	var addOrgQuery = "INSERT INTO organisations(org_name, established_on, username, password, max_fund, created_at, modified_at) VALUES (?,?,?,?,?,?,?)";

	db.getConnection().then(function(connection) {
			console.log("asdgasdg");
			generateHash(req.password).then(function(hash){
				console.log('inside hash');
				connection.query(addOrgQuery, [req.org_name, req.established_on, req.username, hash, req.max_fund,
					 moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')]
				, function(err, results) {
					console.log("query");
					if(err) {
						addOrgDeferred.reject(err);
						connection.release();
						return;
					}
					addOrgDeferred.resolve();
					connection.release();
				});
			}, function(err) {
				connection.release();
				addOrgDeferred.reject(err);
			});
	}, function(err) {
		addOrgDeferred.reject(err);
	});
	return addOrgDeferred.promise;
}

exports.markAsRead = function(id) {
	var markAsReadDefer = q.defer();
	console.log(id);
	var query = "UPDATE notifications SET not_read = 1 where id = ?";
	db.getConnection().then(function(connection) {
		utils.runQuery(connection, query, id);
    }).then(function() {
		markAsReadDefer.resolve();
	}).catch(function(err) {
		markAsReadDefer.reject(err);
	});
	return markAsReadDefer.promise;
}
