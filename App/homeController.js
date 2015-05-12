app.controller("homeController", ["$scope", function ($scope) {
	$scope.radioModel = 2;
	$scope.solution = {
		expression: "",
		result: "success",
		display: false
	};

	$scope.convertToPrefix = function () {
		if ($scope.expressionForm.$valid) {
			switch ($scope.radioModel) {
			case 0:
				alreadySelected();
				break;
			case 1:
				console.log("in");
				break;
			case 2:
				console.log("post");
				break;
			}
		}
	};

	$scope.convertToPostfix = function () {
		if ($scope.expressionForm.$valid) {
			switch ($scope.radioModel) {
			case 0:
				console.log("pre");
				break;
			case 1:
				inToPost();
				break;
			case 2:
				alreadySelected();
				break;
			}
		}
	};

	$scope.convertToInfix = function () {
		if ($scope.expressionForm.$valid) {
			switch ($scope.radioModel) {
			case 0:
				console.log("pre");
				break;
			case 1:
				alreadySelected();
				break;
			case 2:
				console.log("post");
				break;
			}
		}
	};

	var alreadySelected = function () {
		$scope.solution.expression = "Zaznaczyłeś te samą postać a wiec wynik jest ten sam";
		$scope.solution.result = "info"
		$scope.solution.display = true;
	}

	var inToPost = function () {
		var reStr = $scope.expression;
		var stack = [];
		var output = [];
		for (var k = 0, length = reStr.length; k < length; k++) {
			// current char
			var c = reStr[k];
			if(c == " "){
				console.log('whitespace');
				continue;
			}
			if ($.inArray(c,operands) !== -1){
				
			}
			console.log(c);

		}
	}
	var operands = ['(',')','+']; 


}]);