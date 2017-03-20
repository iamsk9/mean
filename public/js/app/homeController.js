myapp.controller('HomeController', function($scope, $mdToast, MyService, $timeout, $location) {

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
});
