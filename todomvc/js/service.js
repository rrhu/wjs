(function (angular) {
	// 得到一个主控制器
	var todoApp = angular.module('TodoApp');

	todoApp.service('Storage', ['$window', function ($window) {
		var storage = $window.localStorage;
		// 解决重复的办法：递归
		function getId() {
			return Math.random();
		}

		//第一次查找数据的时候，'my_todos的值为空，就使用一个空的数组
		var todos = JSON.parse(storage.getItem('my_todo') || '[ ]');
		//保存数据
		this.save = function() {
			storage.setItem('my_todo', JSON.stringify(todos));
		};
		//返回todos数据
		this.get = function () {
			return todos;
		};

		//添加数据
		this.add = function (input) {
			todos.push({id: getId(), text: input, completed: false});
			this.save();
		};
		//删除数据
		this.move = function (current) {
			var index = todos.indexOf(current);
			todos.splice(index, 1);
			this.save();
		};

	//	判断有没有完成的任务
		this.hasCompleted = function() {
			return todos.some(todo => todo.completed);
		};

		// 清空所有已经完成的
		this.clearCompleted = function() {
			// 不能再循环中移除或新增数组元素
			var unCompleteds = [];
			todos.forEach(function(todo) {
				if (!todo.completed) {
					unCompleteds.push(todo);
				}
			});
			todos = unCompleteds;
			return todos;
		};

		// 全部选中完成
		this.allCompleted = function(checked) {
			todos.forEach(todo => { todo.completed = checked; });
		};

	}]);

})(angular);
