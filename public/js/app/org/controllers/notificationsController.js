myapp.controller('NotificationsController', function($scope, $rootScope, $mdToast, OrgService, $location, $mdDialog) {
  function getNotifications() {
    var orgId = $rootScope.orgDetails.id;
    OrgService.getNotifications(orgId).then(function(notifications){
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

  $scope.openNotification = function(item) {
    console.log(item);
    $scope.notDetails = item;
    markAsRead(item.id);
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

  function markAsRead(id) {
    OrgService.markAsRead(id).then(function(){
      console.log("notification marked as read");
  	}, function(err) {
  		console.log("Error");
  	});
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
   }

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
