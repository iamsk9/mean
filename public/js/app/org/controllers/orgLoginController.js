myapp.controller('OrgLoginController', function($scope, $mdToast, MyService, $location) {

  $scope.goToResearcherLogin = function() {
    $location.path('/researcherLogin');
  }
  $scope.goToResearcherRegistration = function() {
    $location.path('/researcherRegistration');
  }
  $scope.goTodashboardPage = function() {
    $location.path('/organisationDashboardPage');
  }
});
