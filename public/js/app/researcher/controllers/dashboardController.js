myapp.controller('ResearcherDashboardController', function($scope, $rootScope, $mdToast, ResearcherService, $location) {
  $scope.dashboardDetails = {};
  function getDashboardDetails() {
    ResearcherService.getDashboardDetails($rootScope.researcherDetails).then(function(data){
      $scope.dashboardDetails.proposalsCount = data.noofproposals;
      $scope.dashboardDetails.organisationsCount = data.nooforganizations;
  	}, function(err) {
  	});
  }
  getDashboardDetails();

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
    $location.path('/newProposal')
  }
  $scope.goToPreviousProposals = function()
  {
    $location.path('/previousProposals')
  }
  $scope.goToHomePage = function()
  {
    $location.path('/')
  }
});
