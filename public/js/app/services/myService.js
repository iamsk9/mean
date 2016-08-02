MyService.factory('MyService', function(Restangular, $q){
	return {
		addClient : function(clientDetails) {
			var addClientDefer = $q.defer();
			var payload = {
				company_name : clientDetails.companyName,
				client_name : clientDetails.clientName,
				email : clientDetails.email,
				phone_number : clientDetails.phoneNumber,
				company_pan_number : clientDetails.panCardNumber
			}
			if(clientDetails.altPhoneNumber) {
				payload.alt_phone_number = clientDetails.altPhoneNumber;
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
