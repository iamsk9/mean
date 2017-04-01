myapp.controller('NewsController', function($scope, $mdToast, OrgService, $location, $mdDialog) {
  $scope.addNews = function() {
    $mdDialog.show({
        controller : function($scope, theScope) {
          $scope.theScope = theScope
        },
      templateUrl : 'addNews.tmpl.html',
      parent : angular.element(document.body),
      clickOutsideToClose:true,
      locals : {
        theScope : $scope
      }
    }).then(function(){
    });
  };

  $scope.addNewsDB = function() {
    //var org_id = $rootScope.orgDetails.id;
    $scope.newsForm.org_id = 1;
    console.log($scope.newsForm);
    OrgService.addNews($scope.newsForm).then(function(){
      $mdToast.show($mdToast.simple()
        .textContent("Notification for Proposal is successfully Submitted")
        .position("top right")
        .hideDelay(5000));
      $scope.proposal = {};
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to Submit Notification")
  		.position("top right")
  		.hideDelay(5000));
  	});
  };

    $scope.goToDashboard = function()
    {
      $location.path('/organisationDashboardPage')
    }
    $scope.goToNotification = function()
    {
      $location.path('/orgNotifications')
    }
    $scope.goToOrganisation = function()
    {
      $location.path('/orgOrganizations')
    }
    $scope.goToProfile = function()
    {
      $location.path('/orgProfile')
    }
    $scope.goToNews = function()
    {
      $location.path('/orgNews')
    }
    $scope.goToUpdates = function()
    {
      $location.path('/orgUpdates')
    }
});
