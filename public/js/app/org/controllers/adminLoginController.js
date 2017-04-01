myapp.controller('AdminLoginController', function($scope, $mdToast, MyService, $location) {

  $scope.goToAdmindashboardPage = function()
  {
    $location.path('/adminDashboard');
  }

  $scope.goToOrgLogin = function() {
  	$location.path('/orgLogin');
  }

  $scope.goToResearcherRegistration = function() {
  	$location.path('/researcherRegistration');
  }
  $scope.goToResearcherLogin = function() {
    $location.path('/researcherLogin');
  }
});
