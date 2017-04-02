var ProposalsHelper = require('../helpers/proposalsHelper.js');

function handleError(err) {
	if(typeof(err.errorCode) != "undefined") {
		this.res.json({returnCode : "FAILURE", data : null, errorCode : err.errorCode});
	} else {
		this.res.json({returnCode : "FAILURE", data : null, errorCode : 1014});
	}
}

exports.getPreviousproposals = function(req,res){
	ProposalsHelper.getPreviousproposals(req.body).then(function(data) {
		res.json({returnCode : "SUCCESS", data : data, errorCode : null});
	}, handleError.bind(this));
};
