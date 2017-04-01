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
    $scope.goToUpdates = function()
    {
      $location.path('/orgUpdates')
    }
    $scope.goToHomePage = function()
    {
      $location.path('/')
    }
});
