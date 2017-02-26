(function(angular) {
	// 得到一个主控制器
	var todoApp = angular.module('TodoApp');

	todoApp.controller('MainController', ['$scope','$location','Storage', function($scope,$location,Storage) {

		// ===== 初始化数据成员 =====
		// 输入框
		$scope.input = '';

		// 当前正在编辑的任务ID
		$scope.currentEditingId = 0;

		$scope.todos=Storage.get();
		// 暴露行为

		// 新增任务
		$scope.add =function(){
			if (!$scope.input) return;
			Storage.add($scope.input);
			$scope.input = '';
		};

		// 删除任务
		$scope.remove = Storage.move;

		// 获取todos中有没有已经完成的元素
		$scope.hasCompleted = Storage.hasCompleted;

		// 清空所有已经完成的
		$scope.clearCompleted = function() {
			var unCompleteds=Storage.clearCompleted();
			$scope.todos = unCompleteds;
		};

		$scope.checkedAll = false;
		// 全部选中完成
		$scope.allCompleted = Storage.allCompleted($scope.checkedAll);

		// 双击启用编辑
		$scope.edit = function(current) {
			$scope.currentEditingId = current.id;
		};

		// 回车保存
		$scope.save = function() {
			$scope.currentEditingId = 0;
			Storage.save();
		};

		//暴露一个过滤器要使用的文件
		$scope.filterData={};
		//监视url链接锚点后的内容变化,$watch()只能监听和$scope上的属性和返回值，所以需要把location绑定到$scope上
		$scope.location=$location;
		$scope.$watch('location.url()',function(newVal,oldVal) {
			switch(newVal) {
				case '/completed':
					$scope.filterData={completed:true};
					break;
				case '/active':
					$scope.filterData={completed:false};
					break;
				default:
					$scope.filterData={ };
					break;
			}
		});

		//  数据持久化



	}]);

})(angular);
