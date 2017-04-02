myapp.controller('ResearcherNewsController', function($scope, $mdToast, $rootScope, $mdDialog, ResearcherService, $location) {

  function getNews() {
    var researcher_id = $rootScope.researcherDetails.id;
    ResearcherService.getNews(researcher_id).then(function(news){
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
    $location.path('/researcherDashboardPage')
  }
  $scope.goToNotification = function()
  {
    $location.path('/notifications')
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
