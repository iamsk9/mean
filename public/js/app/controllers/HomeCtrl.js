angular.module('HomeCtrl', []).controller('MainController', function($scope, $mdToast, MyService) {
	$scope.tagline = 'To the moon and back!';
	$scope.addClient = function() {
		console.log($scope.client.name);
		console.log($scope.client.password);

		MyService.addClient($scope.client).then(function(){
			$mdToast.show($mdToast.simple()
				.textContent("Client is successfully Added")
				.position("top right")
				.hideDelay(5000));
		}, function(err) {
			if(err.errorCode == 1015) {
				$scope.addClientForm.email.$error.userExists = true;
				$scope.addClientForm.email.$invalid = true;
			} else if(err.errorCode == 1018) {
				$scope.addClientForm.panCard.$error.panCardExists = true;
				$scope.addClientForm.panCard.$invalid = true;
			} else {
				$mdToast.show($mdToast.simple()
				.textContent("Error occurred in adding client.")
				.position("top right")
				.hideDelay(5000));
			}
		});
	}
});
