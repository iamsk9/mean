var DashboardHelper = require('../helpers/dashboardHelper');

function handleError(err) {
	console.log(err);
	if(typeof(err.errorCode) != "undefined") {
		this.res.json({returnCode : "FAILURE", data : null, errorCode : err.errorCode});
	} else {
		this.res.json({returnCode : "FAILURE", data : null, errorCode : 1014});
	}
}

exports.getDashboardDetailsOrg = function(req,res){
	DashboardHelper.getDashboardDetailsOrg(req.params.id).then(function(data) {
		res.json({returnCode : "SUCCESS", data : data, errorCode : null});
	}, handleError.bind(this));
};
