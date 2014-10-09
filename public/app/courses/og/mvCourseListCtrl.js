angular.module('app').controller('mvCourseListCtrl', ['$scope', 'mvCourse',
	function($scope, mvCourse) {
		$scope.courses = mvCourse.query();

		$scope.sortOptions = [{
			value: "title",
			text: "Sort by title"
		}, {
			value: "published",
			text: "Sort by published"
		}];

		$scope.sortOrder = $scope.sortOptions[0].value;
	}
]);