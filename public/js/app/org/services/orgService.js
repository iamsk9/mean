myapp.factory('OrgService', function(Restangular, $q){
	return {
		getNotifications: function(id) {
			var notificationDefer = $q.defer();
			Restangular.one('/orgNotifications/'+id).get().then(function(data) {
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
			Restangular.one('/notificationsCount/'+id).get().then(function(data) {
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
		markAsRead: function(id) {
			var markAsReadDefer = $q.defer();
			var payload = {
				id : id
			}
			Restangular.one('/markAsRead/'+id).patch(payload).then(function(data) {
				if(data.returnCode == "SUCCESS") {
					markAsReadDefer.resolve();
				} else {
					markAsReadDefer.reject();
				}
			}, function(err){
				markAsReadDefer.reject(err);
			});
			return markAsReadDefer.promise;
		},
		 addNews : function(newsDetails) {
		 	var addNewsDefer = $q.defer();
		 	console.log(newsDetails);
		 	var payload = {
		 		name : newsDetails.newsname,
				org_id : newsDetails.org_id,
				details : newsDetails.news_details,
				max_fund : newsDetails.max_fund,
				last_date : newsDetails.last_date
		 	}
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
		 },
 		 addOrg : function(orgDetails) {
 		 	var addOrgDefer = $q.defer();
 		 	var payload = orgDetails;
 		 	Restangular.one('/addOrg').post('', payload).then(function(data) {
 		 		if(data.returnCode == "SUCCESS") {
 		 			addOrgDefer.resolve();
 		 		} else {
 		 			addOrgDefer.reject({errorCode : data.errorCode});
 		 		}
 		 	}, function(err) {
 		 		addOrgDefer.reject(err);
 		 	});
 		 	return addOrgDefer.promise;
		},
		signIn : function(login) {
			var signInDefer = $q.defer();
			Restangular.one('/orgAuthenticate').post('', login).then(function(data) {
				if(data.returnCode == "SUCCESS") {
					signInDefer.resolve(data);
				} else {
					signInDefer.reject(data);
				}
			}, function(err) {
				signInDefer.reject(err);
			});
			return signInDefer.promise;
		}
  }
});
