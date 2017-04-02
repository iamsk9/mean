myapp.factory('ResearcherService', function(Restangular, $q){
	return {
		getNotifications: function(id) {
			var notificationDefer = $q.defer();
			Restangular.one('/resnotifications/'+parseInt(id)).get().then(function(data) {
				if(data.returnCode == "SUCCESS") {
					notificationDefer.resolve(data.data);
				} else {
					notificationDefer.reject();
				}
			}, function(err){
				notificationDefer.reject(err);
			});
			return notificationDefer.promise;
		},

		getNotificationsCount: function(id) {
			var notificationsCountDefer = $q.defer();
			Restangular.one('/renotificationsCount/'+id).get().then(function(data) {
				if(data.returnCode == "SUCCESS") {
					notificationsCountDefer.resolve(data.data);
				} else {
					notificationsCountDefer.reject();
				}
			}, function(err){
				notificationsCountDefer.reject(err);
			});
			return notificationsCountDefer.promise;
		},
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
		getNewsCount: function(id) {
			var newsCountDefer = $q.defer();
			Restangular.one('/newsCount/').get().then(function(data) {
				if(data.returnCode == "SUCCESS") {
					newsCountDefer.resolve(data.data);
				} else {
					newsCountDefer.reject();
				}
			}, function(err){
				newsCountDefer.reject(err);
			});
			return newsCountDefer.promise;
		},
		getDashboardDetails: function(details) {
			var dashboardDefer = $q.defer();
			Restangular.one('/dashboardDetails/'+details.id).get().then(function(data) {
				if(data.returnCode == "SUCCESS") {
					dashboardDefer.resolve(data.data);
				} else {
					dashboardDefer.reject();
				}
			}, function(err){
				dashboardDefer.reject(err);
			});
			return dashboardDefer.promise;
		},
		getNews: function() {
			var newsDefer = $q.defer();
			Restangular.one('/getNews').get().then(function(data) {
				if(data.returnCode == "SUCCESS") {
					newsDefer.resolve(data.data);
				} else {
					newsDefer.reject();
				}
			}, function(err){
				newsDefer.reject(err);
			});
			return newsDefer.promise;
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
				organisation : researcherDetails.organisation,
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
		},
		signIn : function(login) {
			var signInDefer = $q.defer();
			Restangular.one('/authenticate').post('', login).then(function(data) {
				if(data.returnCode == "SUCCESS") {
					signInDefer.resolve(data);
				} else {
					signInDefer.reject(data);
				}
			}, function(err) {
				signInDefer.reject(err);
			});
			return signInDefer.promise;
		},
		 submitProposal : function(proposalDetails, id) {
		 	var submitProposalDefer = $q.defer();
		 	console.log(proposalDetails);
		 	var payload = {
		 		name : proposalDetails.name,
		 		org_id : parseInt(proposalDetails.org_id),
		 		doc : proposalDetails.file.name,
				message : proposalDetails.message,
				min_fund : proposalDetails.fund,
		 		researcher_id: id
		 	}
		 	Restangular.one('/submitProposal').post('', payload).then(function(data) {
		 		if(data.returnCode == "SUCCESS") {
		 			submitProposalDefer.resolve();
		 		} else {
		 			submitProposalDefer.reject({errorCode : data.errorCode});
		 		}
		 	}, function(err) {
		 		submitProposalDefer.reject(err);
		 	});
		 	return submitProposalDefer.promise;
		 }
  }
});
