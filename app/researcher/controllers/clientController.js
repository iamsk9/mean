var moment = require('moment');

var q = require('q');

var ClientHelper = require('../helpers/clientHelper');

function handleError(err) {
	console.log(err);
	if(typeof(err.errorCode) != "undefined") {
		this.res.json({returnCode : "FAILURE", data : null, errorCode : err.errorCode});
	} else {
		this.res.json({returnCode : "FAILURE", data : null, errorCode : 1014});
	}
}
exports.addClient = function(req, res) {
	ClientHelper.addClient(req.body).then(function(data) {
		res.json({returnCode : "SUCCESS", data : data, errorCode : null});
	}, handleError.bind(this));
}
