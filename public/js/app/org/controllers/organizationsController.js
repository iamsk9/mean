myapp.controller('OrganizationsController', function($scope, $mdToast, MyService, $location) {
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
