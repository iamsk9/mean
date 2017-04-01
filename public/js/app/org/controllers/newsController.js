myapp.controller('NewsController', function($scope, $mdToast, MyService, $location, $mdDialog) {

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
