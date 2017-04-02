myapp.controller('ResearcherProfileController', function($scope, $mdToast, MyService, $location) {

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
  $scope.goToNewProposal = function()
  {
    $location.path('/newProposal')
  }
  $scope.goToPreviousProposals = function()
  {
    $location.path('/previousProposals')
  }
  $scope.goToHomePage = function()
  {
    $mdToast.show($mdToast.simple()
      .textContent("Successful Logout")
      .position("bottom right")
      .hideDelay(5000));
    $location.path('/')
  }
});
