myapp.controller('DashboardController', function($scope, $rootScope, $mdToast, OrgService, $location) {
  function getNotificationsCount() {
    var orgId = $rootScope.orgDetails.id;
    OrgService.getNotificationsCount(orgId).then(function(notificationsCount){
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
  $scope.goToHomePage = function()
  {
    $mdToast.show($mdToast.simple()
      .textContent("Successful Logout")
      .position("bottom right")
      .hideDelay(5000));
    $location.path('/')
  }
});
