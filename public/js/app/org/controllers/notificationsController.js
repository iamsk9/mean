myapp.controller('NotificationsController', function($scope, $rootScope, $mdToast, OrgService, $location, $mdDialog) {

  var id;
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
    id = item.id;
    if (!item.not_read) {
        markAsRead(item.id);
    }
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

  $scope.sendNotification = function()
  {
    var data = {};
    data.pro_id = id;
    data.message = $scope.notification.message;
    data.org_id = $rootScope.orgDetails.id;
    if($scope.notification.status == "review")
    {
      data.status = 1;
      data.not_name = "Proposal Status is under review";
    }
    else if($scope.notification.status == "reject")
    {
      data.status = 2;
      data.not_name = "Proposal got rejected";
    }
    else
    {
      data.status = 3;
      data.not_name = "Proposal is approved";
    }
    OrgService.sendNotification(data).then(function(){
      $mdToast.show($mdToast.simple()
        .textContent("Notification sent to the Researcher")
        .position("top right")
        .hideDelay(5000));
      $scope.proposal = {};
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to Submit Notification")
  		.position("top right")
  		.hideDelay(5000));
  	});
  }

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
  $scope.goToHomePage = function()
  {
    $mdToast.show($mdToast.simple()
      .textContent("Successful Logout")
      .position("bottom right")
      .hideDelay(5000));
    $location.path('/')
  }
});
