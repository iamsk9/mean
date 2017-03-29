myapp.factory('ResearcherService', function(Restangular, $q){
	return {
		getOrganisations: function() {
			var organisationsDefer = $q.defer();
			Restangular.one('/organisations').get().then(function(data) {
				if(data.returnCode == "SUCCESS") {
					organisationsDefer.resolve(data.data);
				} else {
					organisationsDefer.reject();
				}
			}, function(err){
				organisationsDefer.reject(err);
			});
			return organisationsDefer.promise;
		},	
		registerResearcher : function(researcherDetails) {
			var registerResearcherDefer = $q.defer();
			console.log(researcherDetails);
			var payload = {
				name : researcherDetails.name,
				email : researcherDetails.email,
				mobile : researcherDetails.mobile,
				nationality : researcherDetails.nationality,
				state : researcherDetails.state,
				city : researcherDetails.city,
				organization : researcherDetails.organization,
				gender : researcherDetails.gender,
				username : researcherDetails.username,
				password : researcherDetails.password,				
			}
			Restangular.one('/registerResearcher').post('', payload).then(function(data) {
				if(data.returnCode == "SUCCESS") {
					registerResearcherDefer.resolve();
				} else {
					registerResearcherDefer.reject({errorCode : data.errorCode});
				}
			}, function(err) {
				registerResearcherDefer.reject(err);
			});
			return registerResearcherDefer.promise;
		}		
		// submitProposal : function(proposalDetails, id) {
		// 	var submitProposalDefer = $q.defer();
		// 	console.log(proposalDetails);
		// 	var payload = {
		// 		name : proposalDetails.name,
		// 		org_id : parseInt(proposalDetails.org_id),
		// 		doc : proposalDetails.myFile.name,
		// 		researcher_id: id
		// 	}
		// 	Restangular.one('/submitProposal').post('', payload).then(function(data) {
		// 		if(data.returnCode == "SUCCESS") {
		// 			submitProposalDefer.resolve();
		// 		} else {
		// 			submitProposalDefer.reject({errorCode : data.errorCode});
		// 		}
		// 	}, function(err) {
		// 		submitProposalDefer.reject(err);
		// 	});
		// 	return submitProposalDefer.promise;
		// }
  }
});
