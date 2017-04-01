myapp.controller('AdminDashboardController', function($scope, $mdToast, OrgService, $location) {
  $scope.goToHomePage = function()
  {
    $location.path('/')
  }
  $scope.addNewOrg = function()
  {
    OrgService.addOrg($scope.orgForm).then(function(){
      $mdToast.show($mdToast.simple()
        .textContent("New Organisations is added Successfully")
        .position("top right")
        .hideDelay(5000));
      $scope.proposal = {};
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to add Organisation")
  		.position("top right")
  		.hideDelay(5000));
  	});
  }
});
