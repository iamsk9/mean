myapp.controller('OrgLoginController', function($scope, $rootScope, $mdToast, OrgService, $location) {

  $scope.goToResearcherLogin = function() {
    $location.path('/researcherLogin');
  }
  $scope.goToResearcherRegistration = function() {
    $location.path('/researcherRegistration');
  }
  $scope.goTodashboardPage = function() {
    $location.path('/organisationDashboardPage');
  }

  $scope.goToAdminPage = function() {
		$location.path('/adminPage');
	}

  $scope.signin = function() {
    if($scope.login.username && $scope.login.username != "" && $scope.login.password &&
      $scope.login.password != "") {
      OrgService.signIn($scope.login).then(function(data){
        console.log(data.data.username);
        $rootScope.orgDetails = data.data;
        console.log($rootScope.orgDetails);
        $mdToast.show($mdToast.simple()
          .textContent("Successful Login")
          .position("bottom right")
          .hideDelay(5000));
        $location.path('/organisationDashboardPage');
      }, function(err){
        console.log("error");
        $mdToast.show($mdToast.simple()
          .textContent("Incorrect Username or password")
          .position("bottom right")
          .hideDelay(5000));
      });
    }
  }
});
