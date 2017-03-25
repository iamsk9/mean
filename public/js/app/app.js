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
			.when('/researcherDashboardPage', {
					templateUrl: researcherpath + '/_dashboard.html',
					controller: 'DashboardController'
			})
			.when('/news', {
					templateUrl: researcherpath + '/_news.html',
					controller: 'NewsController'
			})
			.when('/notifications', {
					templateUrl: researcherpath + '/_notifications.html',
					controller: 'NotificationsController'
			})
			.when('/profile', {
					templateUrl: researcherpath + '/_profile.html',
					controller: 'ProfileController'
			})
			.when('/updates', {
					templateUrl: researcherpath + '/_updates.html',
					controller: 'UpdatesController'
			})
			.when('/organizations', {
					templateUrl: researcherpath + '/_organizations.html',
					controller: 'OrganizationsController'
			})
});

myapp.run(function($rootScope, $mdToast, MyService, $mdSidenav,$mdDialog){
});
