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
		}
  }
});
