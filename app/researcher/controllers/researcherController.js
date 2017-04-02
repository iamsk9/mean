var ResearcherHelper = require('../helpers/researcherHelper');

function handleError(err) {
	if(typeof(err.errorCode) != "undefined") {
		this.res.json({returnCode : "FAILURE", data : null, errorCode : err.errorCode});
	} else {
		this.res.json({returnCode : "FAILURE", data : null, errorCode : 1014});
	}
}

exports.authenticate = function(req,res){
	ResearcherHelper.authenticateUser(req).then(function(result){
		res.json({returnCode : "SUCCESS", data : result, errorCode : null});
	}, function(err){
		console.log(err);
		if(typeof(err.errorCode) != "undefined") {
			alert("Login FAILURE --- Incorrect Details");
			res.json({returnCode : "FAILURE", data : null, errorCode : err.errorCode})
		} else {
			console.log("Eroorrrrrr");
			console.log(err);
			alert("Login FAILURE --- Incorrect Details");
			res.json({returnCode : "FAILURE", data : null, errorCode : 1014})
		}
	});
};

exports.getDashboardDetails = function(req,res){
	ResearcherHelper.getDashboardDetails(req.params.id).then(function(data) {
		res.json({returnCode : "SUCCESS", data : data, errorCode : null});
	}, handleError.bind(this));
};

exports.registerResearcher = function(req,res){
	ResearcherHelper.registerResearcher(req.body).then(function(data) {
		res.json({returnCode : "SUCCESS", data : data, errorCode : null});
	}, handleError.bind(this));
};

exports.getNews = function(req,res){
	ResearcherHelper.getNews().then(function(result){
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
