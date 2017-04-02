var q = require('q');

var moment = require('moment');

var db = require('../../../mysqldb');

var emailer = require('../../emailer');

var config = require('../../../config/config');

var bcrypt = require('bcrypt-nodejs');

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

exports.getNewsCount = function(req) {
	var getNewsCountDefer = q.defer();
	var query = "SELECT count(*) as len FROM news WHERE deleted_at is NULL";
	db.getConnection().then(function(connection) {
		return utils.runQuery(connection, query, req);
	}).then(function(results) {
		getNewsCountDefer.resolve(results[0].len);
	}).catch(function(err) {
		getNewsCountDefer.reject(err);
	});
	return getNewsCountDefer.promise;
}


exports.authenticateUser = function(req) {
	var authenticateUserDefer = q.defer();
	db.getConnection().then(function(connection) {
		var query = 'SELECT * FROM researcher WHERE email = ?';
		connection.query(query, [req.body.email], function(err, results){
			if(err) {
				console.log(err);
				authenticateUserDefer.reject(err);
				return;
			}
			if(results.length > 0) {
				var user = results[0];
				comparePassword(req.body.password, user.password).then(function(isMatch){
					if(isMatch) {

							var result = {
								id : user.id, researcher_name : user.researcher_name,
								email : user.email
							};
							authenticateUserDefer.resolve(result);
					} else {
						
						authenticateUserDefer.reject({errorCode : 1011});
					}
					connection.release();
				});
			} else {
						console.log("Erorrrrrr");
						console.log(err);
						//alert("Login FAILURE --- Incorrect Details");
				authenticateUserDefer.reject({errorCode : 1010});
			}
		})
	});
	return authenticateUserDefer.promise;
}

exports.registerResearcher = function(req) {
	var registerResearcherDeferred = q.defer();
	var conn;
	var register = "INSERT INTO researcher(researcher_name, email, phone_number, nationality, state, city, organisation, gender, password, created_at, deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

	db.getConnection().then(function(connection) {
			console.log("asdgasdg");
			generateHash(req.password).then(function(hash){
				console.log('inside hash');
				connection.query(register, [req.name, req.email, req.mobile, req.nationality,
					 req.state,req.city,req.organisation,req.gender,hash,
				moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')]
				, function(err, results) {
					console.log("query");
					if(err) {
						registerResearcherDeferred.reject(err);
						connection.release();
						return;
					}
					registerResearcherDeferred.resolve();
					connection.release();
					console.log("Researcher successfully inserted");
				});

			}, function(err) {
				connection.release();
				registerResearcherDeferred.reject(err);
			});
	}, function(err) {
		registerResearcherDeferred.reject(err);
	});
	return registerResearcherDeferred.promise;
}

exports.getNews = function() {
	var getNewsDefer = q.defer();
	var query = "SELECT news.id, news.name, news.max_fund, news.last_date, org.org_name, news.details from news news INNER JOIN organisations org ON news.org_id = org.id where news.deleted_at is NULL";
	db.getConnection().then(function(connection) {
		return utils.runQuery(connection, query);
	}).then(function(results) {
		getNewsDefer.resolve(results);
	}).catch(function(err) {
		getNewsDefer.reject(err);
	});
	return getNewsDefer.promise;
}

exports.getDashboardDetails = function(req) {
	var getDashboardDeferred = q.defer();
	var conn;
	var results = {};
	db.getConnection().then(function(connection) {
		conn = connection;
		var query = "SELECT max(id) as proID from proposals where deleted_at is NULL AND researcher_id = ?";
		return utils.runQuery(conn, query, req, true);
	}).then(function(result) {
		results.noofproposals = result[0].proID;
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
