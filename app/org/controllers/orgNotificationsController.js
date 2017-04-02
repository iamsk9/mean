var orgNotificationsHelper = require('../helpers/orgNotificationsHelper.js');

function handleError(err) {
	console.log(err);
	if(typeof(err.errorCode) != "undefined") {
		this.res.json({returnCode : "FAILURE", data : null, errorCode : err.errorCode});
	} else {
		this.res.json({returnCode : "FAILURE", data : null, errorCode : 1014});
	}
}

exports.authenticate = function(req,res){
	orgNotificationsHelper.authenticateOrg(req).then(function(result){
		res.json({returnCode : "SUCCESS", data : result, errorCode : null});
	}, function(err){
		console.log(err);
		if(typeof(err.errorCode) != "undefined") {
			res.json({returnCode : "FAILURE", data : null, errorCode : err.errorCode})
		} else {
			console.log(err);
			res.json({returnCode : "FAILURE", data : null, errorCode : 1014})
		}
	});
};

exports.markAsRead = function(req, res) {
	orgNotificationsHelper.markAsRead(req.body.id).then(function(data){
		res.json({returnCode: "SUCCESS", data: data, errorCode : null});
	}, function(err) {
		if(err.errorCode) {
			res.json({returnCode : "FAILURE", data : null, errorCode : err.errorCode});
		} else {
			res.json({returnCode : "FAILURE", data : null, errorCode : 1014});
		}
	});
}

exports.getNotifications = function(req,res){
	orgNotificationsHelper.getNotifications(req.params.id).then(function(result){
		res.json({returnCode : "SUCCESS", data : result, errorCode : null});
	}, function(err){
		console.log(err);
		if(err.errorCode) {
			res.json({returnCode : "FAILURE", data : null, errorCode : err.errorCode})
		} else {
			console.log(err);
			res.json({returnCode : "FAILURE", data : null, errorCode : 1014})
		}
	});
};

exports.getNotificationsCount = function(req,res){
	orgNotificationsHelper.getNotificationsCount(req.params.id).then(function(result){
		res.json({returnCode : "SUCCESS", data : result, errorCode : null});
	}, function(err){
		console.log(err);
		if(err.errorCode) {
			res.json({returnCode : "FAILURE", data : null, errorCode : err.errorCode})
		} else {
			console.log(err);
			res.json({returnCode : "FAILURE", data : null, errorCode : 1014})
		}
	});
};

exports.addNews = function(req,res){
	orgNotificationsHelper.addNews(req.body).then(function(data) {
		res.json({returnCode : "SUCCESS", data : data, errorCode : null});
	}, handleError.bind(this));
};

exports.addOrg = function(req,res){
	orgNotificationsHelper.addOrg(req.body).then(function(data) {
		res.json({returnCode : "SUCCESS", data : data, errorCode : null});
	}, handleError.bind(this));
};
