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
		displayResult("Zaznaczyłeś te samą postać a wiec wynik jest ten sam","info");
	}

	var displayResult = function (msg, status) {
		$scope.solution.expression = msg;
		$scope.solution.result = status;
		$scope.solution.display = true;
	}


	var inToPost = function () {
		var reStr = $scope.expression;
		var stack = [];
		var output = [];
		for (var k = 0, length = reStr.length; k < length; k++) {
			// current char
			var c = reStr[k];
			// skip whitespaces
			if (c == " ") {
				console.log('whitespace');
				continue;
			}
			// operands algoritm
			if ($.inArray(c, operands) !== -1) { // if c is one of operands
				if (c == ')') {
					while (stack[stack.length - 1] != '(') {
						output.push(stack.pop());
					}
					stack.pop();
					continue;
				}
				if (c == '(') {
					stack.push(c);
					continue;
				}

				if (stack.length == 0 || operandsStrength[stack[stack.length - 1]] < operandsStrength[c]) { // for empty stack or if strength is higher just add it
					stack.push(c);
				} else {
					while (operandsStrength[stack[stack.length - 1]] >= operandsStrength[c]) { // while strength is lower or equal
						if (c == '^') { //for right site operand 
							if (operandsStrength[stack[stack.length - 1]] > operandsStrength[c]) { // if lower 
								output.push(stack.pop());
								continue;
							} else {
								break;
							}
						} else {
							output.push(stack.pop());
							continue;
						}
					}
					stack.push(c);
				}
			} else {
				output.push(c);
			}

		}
		for (var k = 0, length = stack.length; k < length; k++) {
			output.push(stack.pop());
		}
		var msg = "";
		for (var k = 0, length = output.length; k < length; k++) {
			msg += output[k];
		}
		displayResult(msg, 'success');
	}

	var operands = ['(', ')', '+', '-', '/', '*', '^'];
	var operandsStrength = {
		'(': 0,
		')': 0,
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2,
		'^': 3
	};

}]);