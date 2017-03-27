var orgNotificationsHelper = require('../helpers/orgNotificationsHelper.js');

exports.getNotifications = function(req,res){
	orgNotificationsHelper.getNotifications().then(function(result){
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
