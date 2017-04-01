
myapp.controller('ResearcherDashboardController', function($scope, $mdToast, ResearcherService, $location) {

/*  ResearcherService.getDashboardData().then(function(data){
    $scope.dashboardDetails = data;
  }, function(err) {
    $mdToast.show($mdToast.simple()
    .textContent("Error in Fetching dashboard details.")
    .position("top right")
    .hideDelay(5000));
  });*/
  $scope.goToDashboardResearcher = function()
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
    console.log("new pro");
    $location.path('/newProposal')
  }
  $scope.goToPreviousProposals = function()
  {
    $location.path('/previousProposals')
  }
  $scope.goToHomePage = function()
  {
    console.log("logout");
    $location.path('/')
  }
});
