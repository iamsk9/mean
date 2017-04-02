myapp.controller('NewsController', function($scope, $rootScope, $mdToast, OrgService, $location, $mdDialog) {
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

  $scope.addNewsDB = function() {
    //var org_id = $rootScope.orgDetails.id;
    $scope.newsForm.org_id = 1;
    console.log($scope.newsForm);
    OrgService.addNews($scope.newsForm).then(function(){
      $mdToast.show($mdToast.simple()
        .textContent("Notification for Proposal is successfully Submitted")
        .position("top right")
        .hideDelay(5000));
      $scope.proposal = {};
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to Submit Notification")
  		.position("top right")
  		.hideDelay(5000));
  	});
  };

  function getNews() {
    var org_id = $rootScope.orgDetails.id;
    console.log(org_id);
    OrgService.getNews(org_id).then(function(news){
  		$scope.news = news;
  	}, function(err) {
  		$mdToast.show($mdToast.simple()
  		.textContent("Unable to fetch news")
  		.position("top right")
  		.hideDelay(5000));
  	});
  }
  getNews();

  $scope.openNews = function(item) {
    console.log(item);
    $scope.newsDetails = item;
    $mdDialog.show({
        controller : function($scope, theScope) {
          $scope.theScope = theScope
        },
      templateUrl : 'news.tmpl.html',
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
