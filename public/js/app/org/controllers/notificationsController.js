myapp.controller('NotificationsController', function($scope, $mdToast, OrgService, $location) {
  function getNotifications() {
    var orgId = 2;
    OrgService.getNotifications(orgId).then(function(notifications){
      console.log("Yes");
      console.log(notifications);
  		$scope.notifications = notifications;
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to fetch notifications")
  		.position("top right")
  		.hideDelay(5000));
  	});
  }
  getNotifications();

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
