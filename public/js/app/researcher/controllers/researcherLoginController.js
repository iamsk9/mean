myapp.controller('ResearcherLoginController', function($scope, $rootScope, $mdToast, ResearcherService, $location) {

		$scope.signin = function() {
			if($scope.login.email && $scope.login.email != "" && $scope.login.password &&
				$scope.login.password != "") {
				ResearcherService.signIn($scope.login).then(function(data){
					$rootScope.researcherDetails = data.data;
					$location.path('/researcherDashboardPage');
				}, function(err){
					if(err.errorCode == 1010) {
						$scope.loginForm.email.$error.notRegistered = true;
						$scope.loginForm.email.$invalid = true;
					} else if(err.errorCode == 1011) {
						$scope.loginForm.password.$error.incorrect = true;
						$scope.loginForm.password.$invalid = true;
					} else if(err.errorCode == 1029) {
						$scope.loginForm.password.$error.clientBlocked = true;
						$scope.loginForm.password.$invalid = true;
					} else if(err.errorCode == 1014) {
						$scope.loginForm.password.$error.serverError = true;
						$scope.loginForm.password.$invalid = true;
					}
				});
			}
		}

		$scope.goToOrgLogin = function() {
			$location.path('/orgLogin');
		}

		$scope.goToResearcherRegistration = function() {
			$location.path('/researcherRegistration');
		}
		$scope.goTodashboardPage = function() {
			$location.path('/researcherDashboardPage');
		}
		$scope.goToAdminPage = function() {
			$location.path('/adminPage');
		}
	$scope.addClient = function() {
		console.log($scope.client.name);
		console.log($scope.client.password);

		MyService.addClient($scope.client).then(function(){
			$mdToast.show($mdToast.simple()
				.textContent("Client is successfully Added")
				.position("top right")
				.hideDelay(5000));
		}, function(err) {
			if(err.errorCode == 1015) {
				$scope.addClientForm.email.$error.userExists = true;
				$scope.addClientForm.email.$invalid = true;
			} else if(err.errorCode == 1018) {
				$scope.addClientForm.panCard.$error.panCardExists = true;
				$scope.addClientForm.panCard.$invalid = true;
			} else {
				$mdToast.show($mdToast.simple()
				.textContent("Error occurred in adding client.")
				.position("top right")
				.hideDelay(5000));
			}
		});
	}
});
