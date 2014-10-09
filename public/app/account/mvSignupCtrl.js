angular.module('app').controller('mvSignupCtrl', ['$scope','$location', 'mvAuth', 'mvNotifier', function($scope, $location, mvAuth, mvNotifier){
	$scope.signup = function() {
		var newUserData = {
			username: $scope.email,
			password: $scope.password,
			firstName: $scope.firstName,
			lastName: $scope.lastName
		};

		mvAuth.createUser(newUserData).then(function() {
			mvNotifier.notify('New User Created');
			$location.path('/');
		}, function(reason) {
			mvNotifier.error(reason);
		});
	};
}]);