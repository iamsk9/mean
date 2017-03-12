var basepath = "/../templates";

var myapp = angular.module('myapp', ['ngMaterial', 'ngRoute', 'restangular', 'ngMessages', 'HomeCtrl',
	'md.data.table', 'ngFileUpload', 'mdPickers']);

  myapp.config(function($mdThemingProvider, $locationProvider, RestangularProvider, $routeProvider){
    RestangularProvider.setBaseUrl('/api/');
		RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        if(response.status == 403) {
            window.location.reload();
            return;
        }
        return data;
    });
  	$routeProvider
			.when('/', {
					templateUrl: basepath + '/home.html',
					controller: 'MainController'
			})
			/*.when('/nerds', {
					templateUrl: basepath + '/nerd.html',
					controller: 'NerdController'
			})
			.when('/geeks', {
					templateUrl: basepath + '/geek.html',
					controller: 'GeekController'
			});*/
  });

	myapp.run(function($rootScope, $mdToast, $location, MyService, $mdSidenav,$mdDialog){

	});
