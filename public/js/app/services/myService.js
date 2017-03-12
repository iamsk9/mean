myapp.factory('MyService', function(Restangular, $q){
	return {
		addClient : function(clientDetails) {
			var addClientDefer = $q.defer();
			console.log(clientDetails);
			var payload = {
				name : clientDetails.name,
				password : clientDetails.password,
				email : clientDetails.email
			}
			Restangular.one('/client').post('', payload).then(function(data) {
				if(data.returnCode == "SUCCESS") {
					addClientDefer.resolve();
				} else {
					addClientDefer.reject({errorCode : data.errorCode});
				}
			}, function(err) {
				addClientDefer.reject(err);
			});
			return addClientDefer.promise;
		},

		getClientsService : function(payload) {
			return Restangular.one('/clients').get(payload);
		},

        clientEnquiryTaskRejectStatus : function(payload){
            var clientEnquiryTaskRejectStatusDefer = $q.defer();
            Restangular.one('/clientTaskRejectStatus').post('',payload).then(function(data) {
	            if(data.returnCode == "SUCCESS") {
						clientEnquiryTaskRejectStatusDefer.resolve(data.data);
					} else {
						clientEnquiryTaskRejectStatusDefer.reject();
					}
				}, function(err){
					clientEnquiryTaskRejectStatusDefer.reject(err);
				});
			return clientEnquiryTaskRejectStatusDefer.promise;
    }
  }
});
