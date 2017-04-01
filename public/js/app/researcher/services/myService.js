myapp.factory('MyService', function(Restangular, $q){
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
		// registerResearcher : function(researcherDetails) {
		// 	var registerResearcherDefer = $q.defer();
		// 	console.log(researcherDetails);
		// 	var payload = {
		// 		name : researcherDetails.name,
		// 		email : researcherDetails.email,
		// 		mobile : researcherDetails.mobile,
		// 		nationality : researcherDetails.nationality,
		// 		state : researcherDetails.state,
		// 		city : researcherDetails.city,
		// 		organization : researcherDetails.organization,
		// 		gender : researcherDetails.gender,
		// 		username : researcherDetails.username,
		// 		password : researcherDetails.password,
		// 	}
		// 	Restangular.one('/registerResearcher').post('', payload).then(function(data) {
		// 		if(data.returnCode == "SUCCESS") {
		// 			registerResearcherDefer.resolve();
		// 		} else {
		// 			registerResearcherDefer.reject({errorCode : data.errorCode});
		// 		}
		// 	}, function(err) {
		// 		registerResearcherDefer.reject(err);
		// 	});
		// 	return registerResearcherDefer.promise;
		// }
        	goToResearcherRegistration: function() {
			var organisationsDefer = $q.defer();
			Restangular.one('/registerResearcher').get().then(function(data) {
				if(data.returnCode == "SUCCESS") {
					organisationsDefer.resolve(data.data);
				} else {
					organisationsDefer.reject();
				}
			}, function(err){
				organisationsDefer.reject(err);
			});
			return organisationsDefer.promise;
		}
  }
});
