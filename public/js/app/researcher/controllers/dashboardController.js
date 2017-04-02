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

  function getNotificationsCount() {
    var id = $rootScope.researcherDetails.id;
    ResearcherService.getNotificationsCount(id).then(function(notificationsCount){
      console.log(notificationsCount);
      if (notificationsCount > 0)
        $rootScope.notificationsCount = notificationsCount;
      else
  		$rootScope.notificationsCount = 0;
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to fetch notifications")
  		.position("top right")
  		.hideDelay(5000));
  	});
  }
  getNotificationsCount();

  function getNewsCount() {
    var id = $rootScope.researcherDetails.id;
    ResearcherService.getNewsCount(id).then(function(newsCount){
      if (newsCount > 0)
        $rootScope.newsCount = newsCount;
      else
  		$rootScope.newsCount = 0;
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to fetch News")
  		.position("top right")
  		.hideDelay(5000));
  	});
  }
  getNewsCount();

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
