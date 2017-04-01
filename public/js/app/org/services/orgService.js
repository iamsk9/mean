myapp.factory('OrgService', function(Restangular, $q){
	return {
		getNotifications: function() {
			var notificationDefer = $q.defer();
			Restangular.one('/orgNotifications').get().then(function(data) {
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
		 addNews : function(newsDetails) {
		 	var addNewsDefer = $q.defer();
		 	console.log(newsDetails);
		 	var payload = {
		 		name : newsDetails.newsname,
				org_id : newsDetails.org_id,
				details : newsDetails.news_details,
				min_fund : newsDetails.min_fund,
				max_fund : newsDetails.max_fund,
				last_date : newsDetails.last_date
		 	}
			console.log("play"+" "+payload);
		 	Restangular.one('/addNews').post('', payload).then(function(data) {
		 		if(data.returnCode == "SUCCESS") {
		 			addNewsDefer.resolve();
		 		} else {
		 			addNewsDefer.reject({errorCode : data.errorCode});
		 		}
		 	}, function(err) {
		 		addNewsDefer.reject(err);
		 	});
		 	return addNewsDefer.promise;
		 }
  }
});
