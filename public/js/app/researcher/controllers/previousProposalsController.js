myapp.controller('PreviousProposalsController', function($scope,$rootScope,ResearcherService, $mdToast, MyService, $location) {
  function getPreviousproposals() {
    var orgId = $rootScope.researcherDetails.id;
    ResearcherService.getPreviousproposals(orgId).then(function(previousProposals){
      console.log(previousProposals);
      $scope.previousProposals = previousProposals;
    }, function(err) {
      $mdToast.show($mdToast.simple()
      .textContent("Unable to fetch notifications")
      .position("top right")
      .hideDelay(5000));
    });
  }
  getPreviousproposals();

  $scope.openPreviousproposals = function() {
    $mdDialog.show({
        controller : function($scope, theScope) {
          $scope.theScope = theScope
        },
      templateUrl : 'notification.tmpl.html',
      parent : angular.element(document.body),
      clickOutsideToClose:true,
      locals : {
        theScope : $scope
      }
    }).then(function(){
           });
  };
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
