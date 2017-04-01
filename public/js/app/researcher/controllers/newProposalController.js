myapp.controller('NewProposalController', function($scope, $mdToast, $rootScope, ResearcherService, $location) {

  function getOrganisations() {
    ResearcherService.getOrganisations().then(function(organisations){
  		$scope.organisations = organisations;
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to fetch organisations")
  		.position("top right")
  		.hideDelay(5000));
  	});
  }
  getOrganisations();

  $scope.submitProposal = function()
  {
    var file = $scope.proposal.myFile.name;
    var uploadUrl = "../../../../../tmp";
    var fd = new FormData();
    /*fd.append("file", file);
    $http.post(uploadUrl, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success().error();*/
    var researcher_id = $rootScope.researcherDetails.id;
    console.log(researcher_id);
    ResearcherService.submitProposal($scope.proposal, researcher_id).then(function(){
      $mdToast.show($mdToast.simple()
        .textContent("Proposal is successfully Submitted")
        .position("top right")
        .hideDelay(5000));
      $scope.proposal = {};
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to Submit Proposal")
  		.position("top right")
  		.hideDelay(5000));
  	});
  }

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
  $scope.goToHomePage = function()
  {
    $location.path('/')
  }
});
