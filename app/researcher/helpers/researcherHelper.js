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
