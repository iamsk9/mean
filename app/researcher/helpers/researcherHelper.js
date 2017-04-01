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

exports.registerResearcher = function(req) {
	var registerResearcherDeferred = q.defer();
	var conn;
	var register = "INSERT INTO researcher(researcher_name, email, phone_number, nationality, state, city, organisation, gender, password, created_at, deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
	
	db.getConnection().then(function(connection) {
			console.log("asdgasdg");
			generateHash('#' + req.password + moment().format('YYYY-MM-DD HH:mm:ss')).then(function(hash){
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
