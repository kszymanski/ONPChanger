app.service("notationConverter", function () {
	operators = ['(', ')', '+', '-', '/', '*', '^'];

	operatorsStrength = {
		'(': 0,
		')': 0,
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2,
		'^': 3
	};


	this.InfixToPostfix = function (expression) {
		var reStr = expression;
		var stack = []; // stack for operators
		var output = []; //stack for output
		for (var k = 0, length = reStr.length; k < length; k++) {
			var c = reStr[k]; //current char
			// skip whitespaces
			if (c == " ") {
				continue;
			}
			// operators algoritm
			if ($.inArray(c, operators) !== -1) { // if c is one of operands
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

				if (stack.length == 0 || operatorsStrength[stack[stack.length - 1]] < operatorsStrength[c]) { // for empty stack or if strength is higher just add it
					stack.push(c);
				} else {
					while (operatorsStrength[stack[stack.length - 1]] >= operatorsStrength[c]) { // while strength is lower or equal
						if (c == '^') { //for right site operand 
							if (operatorsStrength[stack[stack.length - 1]] > operatorsStrength[c]) { // if lower 
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
			}
			// opperands algorithm
			else {
				i = 1;
				while ($.inArray(reStr[k + i], operators) === -1 && k + i < length) {
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
	};

	this.InfixToPrefix = function (expression) {
		var reStr = expression;
		// revers input
		reStr = reStr.split('').reverse().join('');
		// brackets conversion
		reStr = reStr.replace(/[)]/g, '#');
		reStr = reStr.replace(/[(]/g, ')');
		reStr = reStr.replace(/[#]/g, '(');
		// use Change to Postfx notation
		var result = this.InfixToPostfix(reStr);
		// Revers output to match Prefix notation
		result = result.split('').reverse().join('');

		return result;
	};

	this.PostfixToInfix = function (expression) {
		var reStr = expression;
		// stack for output
		var output = [];

		for (var k = 0, length = reStr.length; k < length; k++) {
			//current char
			var c = reStr[k];
			// whitespace ignore
			if (c == ' ') {
				continue;
			}
			//char is operand
			if ($.inArray(c, operators) == -1) {
				i = 1;
				// Put togeather all chars for number greater than 9
				while (($.inArray(reStr[k + i], operators) === -1 && reStr[k + i] != ' ') && k + i < length) {
					c += reStr[k + i];
					i++;
				}
				k = k + i - 1;

				// Push operand to output
				output.push(c);

			}
			// If operator
			else {
				// Check if 2 operators are available on stack
				if (output.length < 2) {
					throw "something went wrong";
				}
				// pop operators
				var b = output.pop();
				var a = output.pop();
				// push result as new operator 
				output.push('(' + a + ' ' + c + ' ' + b + ')')
			}
		}
		// Check if there is only one result
		if (output.length > 1) {
			throw "to much";
		}
		// return full result
		return output.pop();
	};

	this.PrefixToInfix = function (expression) {
		var reStr = expression;
		// revers expression to mach postfix
		reStr = reStr.split('').reverse().join('');
		// Change to Infix
		reStr = this.PostfixToInfix(reStr);
		// revers expression 
		reStr = reStr.split('').reverse().join('');
		// Brackets replace
		reStr = reStr.replace(/[)]/g, '#');
		reStr = reStr.replace(/[(]/g, ')');
		reStr = reStr.replace(/[#]/g, '(');
		return reStr;
	};
	
	this.PostfixToPrefix = function(expression){
		// Turn expression into Infix then to Prefix
		return this.InfixToPrefix(this.PostfixToInfix(expression));
	};
	
	this.PrefixToPostfix = function(expression){
		// Turn expression to Infix then to Postfix
		return this.InfixToPostfix(this.PrefixToInfix(expression));
	};

});