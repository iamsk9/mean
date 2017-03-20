var homepath = "/../templates";
var researcherpath = "/../templates/researcher";
var orgpath = "/../templates/org";

var myapp = angular.module('myapp', ['ngMaterial', 'ngRoute', 'restangular', 'ngMessages',
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
					templateUrl: homepath + '/_home.html',
					controller: 'HomeController'
			})
			.when('/researcherLogin', {
					templateUrl: researcherpath + '/_researcherLogin.html',
					controller: 'ResearcherLoginController'
			})
			.when('/researcherRegistration', {
					templateUrl: researcherpath + '/_researcherRegistration.html',
					controller: 'ResearcherRegistrationController'
			})
			.when('/orgLogin', {
					templateUrl: orgpath + '/_orgLogin.html',
					controller: 'OrgLoginController'
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
