angular.module('app').controller('mvCourseDetailCtrl', ['$scope', 'mvCourse', '$routeParams', function($scope, mvCourse, $routeParams) {
		$scope.course = mvCourse.get({_id: $routeParams.id});
	}
]);