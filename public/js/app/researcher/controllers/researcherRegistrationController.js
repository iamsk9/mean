myapp.controller('ResearcherRegistrationController', function($scope, $mdToast, MyService, $location) {

  $scope.goToResearcherLogin = function() {
    $location.path('/researcherLogin');
  }

  $scope.goToOrgLogin = function() {
    $location.path('/orgLogin');
  }
});
