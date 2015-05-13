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
				displayResult(inToPre($scope.expression), 'success');
				break;
			case 2:
				displayResult(inToPre(postToIn($scope.expression)), 'success');
				break;
			}
		}
	};

	$scope.convertToPostfix = function () {
		if ($scope.expressionForm.$valid) {
			switch ($scope.radioModel) {
			case 0:
				displayResult(inToPost(preToIn($scope.expression)), 'success');
				break;
			case 1:
				displayResult(inToPost($scope.expression), 'success');
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
				displayResult(preToIn($scope.expression), 'success');
				break;
			case 1:
				alreadySelected();
				break;
			case 2:
				displayResult(postToIn($scope.expression), 'success');
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


	var preToIn = function (expression) {
		var reStr = expression;
		reStr = reStr.split('').reverse().join('');
		reStr = postToIn(reStr);
		reStr = reStr.split('').reverse().join('');
		reStr = reStr.replace(/[)]/g, '#');
		reStr = reStr.replace(/[(]/g, ')');
		reStr = reStr.replace(/[#]/g, '(');
		return reStr;
	}


	var postToIn = function (expression) {
		var reStr = expression;
		var stack = [];

		for (var k = 0, length = reStr.length; k < length; k++) {
			var c = reStr[k];
			if (c == ' ') {
				continue;
			}
			if ($.inArray(c, operands) == -1) {
				i = 1;
				while (($.inArray(reStr[k + i], operands) === -1 && reStr[k + i] != ' ') && k + i < length) {
					c += reStr[k + i];
					i++;
				}
				k = k + i - 1;
				stack.push(c);

			} else {
				if (stack.length < 2) {
					throw "lipa";
				}
				var b = stack.pop();
				var a = stack.pop();
				stack.push('(' + a + ' ' + c + ' ' + b + ')')
			}
		}
		if (stack.length > 1) {
			throw "to much";
		}
		return stack.pop();
	}




	var inToPre = function (expression) {
		var reStr = expression;
		reStr = reStr.split('').reverse().join('');
		reStr = reStr.replace(/[)]/g, '#');
		reStr = reStr.replace(/[(]/g, ')');
		reStr = reStr.replace(/[#]/g, '(');

		var result = inToPost(reStr);
		result = result.split('').reverse().join('');

		return result;
	}

	var inToPost = function (expression) {
		var reStr = expression;
		var stack = [];
		var output = [];
		for (var k = 0, length = reStr.length; k < length; k++) {
			// current char
			var c = reStr[k];
			// skip whitespaces
			if (c == " ") {
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
				i = 1;
				while ($.inArray(reStr[k + i], operands) === -1 && k + i < length) {
					c += reStr[k + i];
					i++;
				}
				k = k + i - 1;
				output.push(c);
			}

		}
		for (var k = 0, length = stack.length; k < length; k++) {
			output.push(stack.pop());
		}
		var result = "";
		for (var k = 0, length = output.length; k < length; k++) {
			result += " " + output[k];
		}
		return result;
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