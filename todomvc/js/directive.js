(function (angular) {
	'use strict';
	// 得到一个主控制器
	var todoApp = angular.module('TodoApp');
	todoApp.directive('autoFocus', [function () {
		return {
			link: function (scope,element,attributes) {
				//console.log(element);
				element.on('dblclick',function() {
					angular.element(this).find('input').eq(1)[0].focus();
				});
			}
		}
	}]);
})(angular);
