app.controller("homeController", ["$scope", "notationConverter", function ($scope, notationConverter) {
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
				displayResult(notationConverter.InfixToPrefix($scope.expression), 'success');
				break;
			case 2:
				displayResult(notationConverter.PostfixToPrefix($scope.expression), 'success');
				break;
			}
		}
	};

	$scope.convertToPostfix = function () {
		if ($scope.expressionForm.$valid) {
			switch ($scope.radioModel) {
			case 0:
				displayResult(notationConverter.PrefixToPostfix($scope.expression), 'success');
				break;
			case 1:
				displayResult(notationConverter.InfixToPostfix($scope.expression), 'success');
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
				displayResult(notationConverter.PrefixToInfix($scope.expression), 'success');
				break;
			case 1:
				alreadySelected();
				break;
			case 2:
				displayResult(notationConverter.PostfixToInfix($scope.expression), 'success');
				break;
			}
		}
	};

	var alreadySelected = function () {
		displayResult("Zaznaczyłeś te samą postać a wiec wynik jest ten sam", "info");
	}

	var displayResult = function (msg, status) {
		$scope.solution.expression = msg;
		$scope.solution.result = status;
		$scope.solution.display = true;
	}

}]);