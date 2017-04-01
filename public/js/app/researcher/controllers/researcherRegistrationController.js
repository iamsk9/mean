myapp.controller('ResearcherRegistrationController', function($scope, $mdToast, ResearcherService, $location) {

  $scope.registerResearcher = function() {
    console.log($scope.researcher);
			ResearcherService.registerResearcher($scope.researcher).then(function(){
				$scope.registerResearcher = false;
				$mdToast.show($mdToast.simple()
					.textContent("Researcher successfully Registered")
					.position("top right")
					.hideDelay(5000));
				$scope.researcher = {};
        $location.path('/researcherLogin');
			}, function(err) {

				// if(err.errorCode == 1015) {
				// 	$scope.addClientForm.email.$error.userExists = true;
				// 	$scope.addClientForm.email.$invalid = true;
				// } else if(err.errorCode == 1018) {
				// 	$scope.addClientForm.panCard.$error.panCardExists = true;
				// 	$scope.addClientForm.panCard.$invalid = true;
				// } else {
				// 	$mdToast.show($mdToast.simple()
				// 	.textContent("Error occurred in adding client.")
				// 	.position("top right")
				// 	.hideDelay(5000));
				// }
			});

	}

  $scope.goToDashboard = function()
  {
    $location.path('/researcherDashboardPage')
  }
  $scope.goToNotification = function()
  {
    $location.path('/notifications')
  }
  $scope.goToOrganisation = function()
  {
    $location.path('/organizations')
  }
  $scope.goToProfile = function()
  {
    $location.path('/profile')
  }
  $scope.goToNews = function()
  {
    $location.path('/news')
  }
  $scope.goToUpdates = function()
  {
    $location.path('/updates')
  }
  $scope.goToNewProposal = function()
  {
    $location.path('/newProposal')
  }
  $scope.goToPreviousProposals = function()
  {
    $location.path('/previousProposals')
  }
  $scope.goToOrgLogin = function() {
    $location.path('/orgLogin');
  }
  $scope.goToResearcherLogin = function() {
    $location.path('/researcherLogin');
  }
  $scope.goToAdminPage = function() {
		$location.path('/adminPage');
	}
});
