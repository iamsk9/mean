myapp.controller('ProfileController', function($scope, $mdToast, MyService, $location) {

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
});
