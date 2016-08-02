/*var LoginApp = angular.module('loginApp', ['ngMaterial', 'ngRoute','restangular', 'ngMessages']);

var basepath = "/static/templates";

LoginApp.config(function($mdThemingProvider, $routeProvider, RestangularProvider){
	$mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('green');
    RestangularProvider.setBaseUrl('/api/');

    $routeProvider
    	.when("/", {
            templateUrl : basepath + "/_login.html",
            controller  : "loginController"
    	})
    	.when("/forgotpassword", {
            templateUrl : basepath + "/_forgotPassword.html",
            controller  : "forgotPasswordController"
        })
        .otherwise('/')
});*/
