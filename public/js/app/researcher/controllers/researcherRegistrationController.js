myapp.controller('researcherRegistrationController', function($scope, $mdToast, MyService, $timeout) {
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
