var DashboardHelper = require('../helpers/dashboardHelper');

exports.getDashboardData = function(req,res){
	var promisesArray = [DashboardHelper.getProposalsCount(), DashboardHelper.getOrganizationsCount()];
	q.all(promisesArray).then(function() {
		console.log(dashboardDetails);
		res.json({returnCode : "SUCCESS", data : dashboardDetails, errorCode : null});
	}, function(err) {
		res.json({returnCode : "FAILURE", data : null, errorCode : 1014});
	});
};