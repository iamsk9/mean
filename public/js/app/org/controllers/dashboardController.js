myapp.controller('DashboardController', function($scope, $rootScope, $mdToast, OrgService, $location) {
  function getNotificationsCount() {
    var orgId = $rootScope.orgDetails.id;
    OrgService.getNotificationsCount(orgId).then(function(notificationsCount){
      console.log(notificationsCount);
  		$scope.notificationsCount = notificationsCount;
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
  $scope.goToUpdates = function()
  {
    $location.path('/orgUpdates')
  }
  $scope.goToHomePage = function()
  {
    $location.path('/')
  }
});
