myapp.controller('ResearcherNewsController', function($scope, $mdToast, $rootScope, ResearcherService, $location) {

  function getNews() {
    var researcher_id = $rootScope.researcherDetails.id;
    ResearcherService.getNews(researcher_id).then(function(news){
      console.log(news);
  		$scope.news = news;
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to fetch news")
  		.position("top right")
  		.hideDelay(5000));
  	});
  }
  getNews();

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
