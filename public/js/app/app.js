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
			.when('/contactForm', {
					templateUrl: homepath + '/_contact.html',
					controller: 'HomeController'
			})
			.when('/adminPage', {
					templateUrl: orgpath + '/_adminLogin.html',
					controller: 'AdminLoginController'
			})
			.when('/adminDashboard', {
					templateUrl: orgpath + '/_adminDashboard.html',
					controller: 'AdminDashboardController'
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
					controller: 'ResearcherDashboardController'
			})
			.when('/newProposal', {
					templateUrl: researcherpath + '/_newProposal.html',
					controller: 'NewProposalController'
			})
			.when('/previousProposals', {
					templateUrl: researcherpath + '/_previousProposals.html',
					controller: 'PreviousProposalsController'
			})
			.when('/news', {
					templateUrl: researcherpath + '/_news.html',
					controller: 'ResearcherNewsController'
			})
			.when('/notifications', {
					templateUrl: researcherpath + '/_notifications.html',
					controller: 'ResearcherNotificationsController'
			})
			.when('/profile', {
					templateUrl: researcherpath + '/_profile.html',
					controller: 'ResearcherProfileController'
			})
			.when('/updates', {
					templateUrl: researcherpath + '/_updates.html',
					controller: 'ResearcherUpdatesController'
			})
			.when('/organizations', {
					templateUrl: researcherpath + '/_organizations.html',
					controller: 'ResearcherOrganizationsController'
			})
			.when('/organisationDashboardPage', {
					templateUrl: orgpath + '/_dashboard.html',
					controller: 'DashboardController'
			})
			.when('/orgNews', {
					templateUrl: orgpath + '/_news.html',
					controller: 'NewsController'
			})
			.when('/orgNotifications', {
					templateUrl: orgpath + '/_notifications.html',
					controller: 'NotificationsController'
			})
			.when('/orgProfile', {
					templateUrl: orgpath + '/_profile.html',
					controller: 'ProfileController'
			})
			.when('/orgUpdates', {
					templateUrl: orgpath + '/_updates.html',
					controller: 'UpdatesController'
			})
			.when('/orgOrganizations', {
					templateUrl: orgpath + '/_organizations.html',
					controller: 'OrganizationsController'
			})
});

myapp.run(function($rootScope, $mdToast, MyService, $mdSidenav,$mdDialog){
});
