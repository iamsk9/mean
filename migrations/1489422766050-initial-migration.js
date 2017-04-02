'use strict'
var db = require('../mysqldb');
exports.up = function(next) {
  console.log("yes");
  	function executeQuery(connection, query, index) {
  		connection.query(query[index], function(err, result) {
  			if(err) {
  				throw err;
  			}
  			console.log(query[index]);
  			console.log("Successful");
  			if(index == (query.length - 1)) {
    				next();
    			}
  		});
  	}
  	db.getConnection().then(function(connection) {
      console.log("Yes");
  		var query = [];
  		query = [
  		"CREATE TABLE organisations (id int NOT NULL AUTO_INCREMENT, org_name varchar(255) NOT NULL,\
  		established_on DATETIME NOT NULL, username varchar(20), password varchar(255), max_fund INT, about varchar(255) NOT NULL, created_at DATETIME, \
      deleted_at DATETIME, modified_at DATETIME, PRIMARY KEY (id))",
  		"CREATE TABLE researcher (id int NOT NULL AUTO_INCREMENT, researcher_name varchar(255) NOT NULL, \
      email varchar(50) NOT NULL, phone_number varchar(15), nationality varchar(50), state varchar(50), \
      city varchar(50), organisation varchar(50), gender varchar(10), password varchar(255) NOT NULL,\
      created_at DATETIME, deleted_at DATETIME, modified_at DATETIME, PRIMARY KEY (id))",
  		"CREATE TABLE proposals (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL,\
      org_id int NOT NULL, doc varchar(225) NOT NULL, message varchar(255), min_fund int, researcher_id int NOT NULL, \
  		created_at DATETIME, deleted_at DATETIME, modified_at DATETIME, PRIMARY KEY (id), \
      FOREIGN KEY (org_id) REFERENCES organisations(id), FOREIGN KEY (researcher_id) REFERENCES researcher(id))",
      "CREATE TABLE news (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL,\
  		details varchar(255) NOT NULL, org_id int NOT NULL, min_fund int, last_date DATETIME, created_at DATETIME, \
      deleted_at DATETIME, modified_at DATETIME, PRIMARY KEY (id), FOREIGN KEY (org_id) REFERENCES organisations(id))",
      "CREATE TABLE updates (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL,\
  		details varchar(255) NOT NULL, org_id int NOT NULL, created_at DATETIME, \
      deleted_at DATETIME, modified_at DATETIME, PRIMARY KEY (id), FOREIGN KEY (org_id) REFERENCES organisations(id))",
      "CREATE TABLE notifications (id int NOT NULL AUTO_INCREMENT, pro_id int NOT NULL,\
      not_name varchar(255) NOT NULL, not_read int NOT NULL, org_id int NOT NULL, created_at DATETIME, \
      deleted_at DATETIME, modified_at DATETIME, PRIMARY KEY(id), FOREIGN KEY (pro_id) REFERENCES proposals(id))"
    ];
  		for(var i in query) {
  			executeQuery(connection, query, i);
  		}
  	});
};

exports.down = function(next) {
  function executeQuery(connection, query, index) {
		connection.query(query[index], function(err, result) {
			if(err) {
				throw err;
			}
			if(index == (query.length - 1)) {
  				next();
  			}
		});
	}
	db.getConnection().then(function(connection) {
		var query = [];
		query = ["DROP TABLE organisations", "DROP TABLE researcher","DROP TABLE proposals","DROP TABLE updates","DROP TABLE notifications","DROP TABLE news;"];
		for(var i in query) {
			executeQuery(connection, query, i);
		}
	});
};
