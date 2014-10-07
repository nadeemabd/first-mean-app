angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
	$scope.identity = mvIdentity;
	$scope.signin = function(username, password) {
		mvAuth.authenticateUser(username, password).then(function(success) {
			if (success) {
				mvNotifier.notify('You successfully logged in');
			} else {
				mvNotifier.notify('Incorrect username or password');
			}
		});
	};

	$scope.signout = function() {
		mvAuth.logoutUser().then(function() {
			$scope.username = "";
			$scope.password = "";
			mvNotifier.notify('You successfully logged out');
			$location.path('/');
		});
	};
});