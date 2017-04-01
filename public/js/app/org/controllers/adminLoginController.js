myapp.controller('AdminLoginController', function($scope, $mdToast, MyService, $location) {

  $scope.goToAdmindashboardPage = function()
  {
    $location.path('/adminDashboard');
  }
});
