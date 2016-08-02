var basepath = "/static/templates";

var myapp = angular.module('myapp', ['ngMaterial', 'ngRoute', 'restangular', 'ngMessages',
	'md.data.table', 'ngFileUpload', 'mdPickers']);

/*
  Caweb.constant('Tabs', {
      'admin' : [	'', ''],
      'branch manager' : [ 'Dashboard','Clients','Documents','Manage Users','Assign Task','Tasks','Reports'],
      'employee' : ['Clients','Documents','Tasks'],
      'CLIENT' : ['Documents'],
      'clerk' : ['Clients','Documents']
  })
  .constant('workStatus', [
  	'Pending',
      'Done',
      'Response',
  	'Completed'
  ]);*/

/*
  myapp.config(function($mdThemingProvider, RestangularProvider, $routeProvider, $interpolateProvider){
  	$mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange');
      $interpolateProvider.startSymbol('[[').endSymbol(']]');
      RestangularProvider.setBaseUrl('/api/');
      /*RestangularProvider.setDefaultHeaders({
      	'x-ca-api-token' : apiKey
      });
      RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
          if(response.status == 403) {
              window.location.reload();
              return;
          }
          return data;
      });
      $routeProvider
          .when("/dashboard", {
              templateUrl : basepath + "/_dashboard.html",
              controller  : "dashboardController"
          })
          .when('/client/new', {
          	templateUrl : basepath + "/_addClient.html",
          	controller : "addClientController"
          })
          .otherwise('/');
  });

Caweb.run(function($rootScope, UserService, $mdToast, Tabs, $location, MyService, $mdSidenav,$mdDialog,
    $interval) {
    MyService.getTasks().then(function(results){
       allTasks = results;
    });

    $rootScope.logout = function(){
      UserService.logout().then(function(){
      window.location.replace('/');
      }, function() {
      $mdToast.show($mdToast.simple()
      .textContent("Unable to logout the user")
      .position("top right")
      .hideDelay(5000));
      });
      }

      $rootScope.switchTab = function(index,tab) {
        var changeRoute = function() {
            if($rootScope.user.role == "CLIENT") {
                index = $rootScope.tabsMap[tab];
            } else if($rootScope.user.role == "clerk" && (tab == "Documents" || tab == "Clients")) {
                index = $rootScope.tabsMap[tab];
            } else if($rootScope.user.role == "employee" && (tab == "Documents" || tab == "Tasks" || tab == "Clients")) {
                index = $rootScope.tabsMap[tab];
            }
            switch(index) {
                case $rootScope.tabsMap['Dashboard'] : $location.path('/dashboard');
                    break;
                case $rootScope.tabsMap['Clients'] : $location.path('/clients');
                    break;
                case $rootScope.tabsMap['Documents'] : $location.path('/documents');
                    break;
                case $rootScope.tabsMap['Download Count'] : $location.path('/downloadCount');
                    break;
                case $rootScope.tabsMap['Manage Users'] : $location.path('/users');
                    break;
                case $rootScope.tabsMap['Branches'] : $location.path('/branches');
                    break;
                case $rootScope.tabsMap['Master Management'] : $location.path('/departments');
                    break;
                case $rootScope.tabsMap['Assign Task'] : $location.path('/assigntask');
                    break;
                case $rootScope.tabsMap['Tasks'] : $location.path('/tasks');
                    break;
                case $rootScope.tabsMap['Reports'] : $location.path('/reports');
                    break;
            }
        }
	}
    });*/
