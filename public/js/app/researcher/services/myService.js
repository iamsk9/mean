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
		}
  }
});
