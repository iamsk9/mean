myapp.controller('ResearcherLoginController', function($scope, $mdToast, MyService, $timeout) {

	$scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    var tick = function() {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);

		$scope.goToResearcherLogin = function() {
			$location.path('/researcherLogin');
		}

		$scope.goToOrgLogin = function() {
			$location.path('/orgLogin');
		}

		$scope.goToResearcherRegistration = function() {
			$location.path('/researcherRegistration');
		}

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
