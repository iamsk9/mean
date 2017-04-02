myapp.controller('ResearcherNotificationsController', function($scope, $rootScope, $mdDialog, $mdToast, ResearcherService, $location) {

  function getNotifications() {
    var id = $rootScope.researcherDetails.id;
    ResearcherService.getNotifications(id).then(function(notifications){
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
    $location.path('/researcherDashboardPage')
  }
  $scope.goToNotification = function()
  {
    $location.path('/news')
  }
  $scope.goToOrganisation = function()
  {
    $location.path('/organizations')
  }
  $scope.goToProfile = function()
  {
    $location.path('/profile')
  }
  $scope.goToNews = function()
  {
    $location.path('/news')
  }
  $scope.goToNewProposal = function()
  {
    $location.path('/newProposal')
  }
  $scope.goToPreviousProposals = function()
  {
    $location.path('/previousProposals')
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
