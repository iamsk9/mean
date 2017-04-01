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
	var query = "SELECT noti.id, noti.not_name, re.researcher_name, noti.not_read from notifications noti INNER JOIN proposals pro ON noti.pro_id = pro.id INNER JOIN researcher re ON re.id = pro.researcher_id where noti.deleted_at is NULL and pro.deleted_at is NULL and noti.org_id = ?";
	db.getConnection().then(function(connection) {
		return utils.runQuery(connection, query, req);
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

exports.addOrg = function(req) {

	var addOrgDeferred = q.defer();
	var conn;
	var addOrgQuery = "INSERT INTO organisations(org_name, established_on, username, password, created_at, modified_at) VALUES (?,?,?,?,?,?)";

	db.getConnection().then(function(connection) {
			console.log("asdgasdg");
			generateHash(req.password).then(function(hash){
				console.log('inside hash');
				connection.query(addOrgQuery, [req.org_name, req.established_on, req.username, hash,
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
