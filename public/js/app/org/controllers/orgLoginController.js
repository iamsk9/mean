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

  $scope.signin = function() {
    if($scope.login.username && $scope.login.username != "" && $scope.login.password &&
      $scope.login.password != "") {
      OrgService.signIn($scope.login).then(function(data){
        console.log(data.data.username);
        $rootScope.orgDetails = data.data;
        console.log($rootScope.orgDetails);
        $location.path('/organisationDashboardPage');
      }, function(err){
        if(err.errorCode == 1010) {
          $scope.loginForm.username.$error.notRegistered = true;
          $scope.loginForm.username.$invalid = true;
        } else if(err.errorCode == 1011) {
          $scope.loginForm.password.$error.incorrect = true;
          $scope.loginForm.password.$invalid = true;
        } else if(err.errorCode == 1029) {
          $scope.loginForm.password.$error.clientBlocked = true;
          $scope.loginForm.password.$invalid = true;
        } else if(err.errorCode == 1014) {
          $scope.loginForm.password.$error.serverError = true;
          $scope.loginForm.password.$invalid = true;
        }
      });
    }
  }
});
