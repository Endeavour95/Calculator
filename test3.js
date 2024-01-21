let s = '2+5+6%2*5/2%1+5';

let arrstr = s.split("");

console.log(arrstr);


function evaluateExpression() {
    let str = arrstr.join('');

    // Regular expression to match numbers and operators
    const regex = /(\d+(\.\d+)?|[\+\-\*\/\%])/g;

    // Extract numbers and operators from the string
    const elements = str.match(regex);

    // Separate numbers and operators
    const data = { numbers: [], operators: [] };
    elements.forEach(element => {
        if (/[0-9]/.test(element) || element === '.') {
            data.numbers.push(parseFloat(element));
        } else {
            data.operators.push(element);
        }
    });

    const operatorsPrecedence = ['%', '/', '*', '+', '-'];

    // Calculate result based on operator precedence (BODMAS)

    operatorsPrecedence.forEach(operator => {
        let index = 0;
        
        while (data.operators.includes(operator)) {
            index = data.operators.indexOf(operator, index);
            // while (data.operators.length > 0) {            
            //     index = data.operators.indexOf('%', index);
            // const operator = data.operators[0];
            // const index = data.operators.indexOf(operator);
            const leftOperand = data.numbers[index];
            const rightOperand = data.numbers[index + 1];
            let result;

            switch (operator) {
                case '%':
                    result = (leftOperand / 100) * rightOperand;
                    break;
                case '*': // Multiply and divide before adding and subtracting
                case '/':
                    result = operator === '*' ? leftOperand * rightOperand : leftOperand / rightOperand;
                    break;
                case '+':
                case '-':
                    result = operator === '+' ? leftOperand + rightOperand : leftOperand - rightOperand;
                    break;
                default:
                    break;
            }

            // Update numbers and operators arrays with the result
            data.numbers.splice(index, 2, result);
            data.operators.splice(index, 1);
            index++;
        }
    });

    arrstr = [];
    arrstr.push(data.numbers[0]);
    return arrstr.join('');
}

evaluateExpression();

console.log(arrstr);














// +++++++++++++++++ //
// Sample Test Cases //
// +++++++++++++++++ //
// 10+20-30+40*5/2+10/5
// 10*20-30/40/5+2-10*5*9
// 10*20-30/40*5/2-10*5*0
// 10+20-30+40*5/2+10*5/5
// 10*20-30/40*5/2-10*5-87*2+115*111
// 10+20-30+40*5/(2+10*5)*5
// 10+20-(30+40)*5/2+(10*5)/5+(6+9)
// 10+20-(30+40*(10+10))*5/2+(10*5)/5+(6+9)
// 10+20-((30+40)*(10+10))*5/2+(10*5)/5+(6+9)
// ((14+11)+15*16-(13+10*11)+(10+10-(10*2)))
// 10+20-((30+40)*10+(10+(10*5))+10)
// 10+20-((30+40)*10+(10+(10*5+9)+9))+10
// 10+20-((30+40)*10+(10+(10+5))+10/(5*(10+10)))*5/2+(10*5)/5+(6+9+78/7)
// (10+20)-((30+40)*10+(10+(10+5)-(5+5))+(10/(5*(10+10)))*5/2+(10*5)/5+(6+9+78/7))

/// 10*(20-30/2)+40*5+2-(10*5+9)-(87*2+115*111)
/// 10*(20-30/2)+40*5+2-(10*5+9)*1-(87*2+115*111)
// console.log(eval(10*(20-30/2)+40*5+2-(10*5+9)-(87*2+115*111)))

// function append(text) {
//   document.getElementById("equation").value += text
// }

// function clearEquation() {
//   document.getElementById("equation").value = ""
//   document.getElementById("result").value = ""
// }

// function backspace(text) {
//   document.getElementById("equation").value = text.substring(0, text.length - 1)
// }

// function startEvaluation(equation) {

//   console.log(eval(equation))

//   // var equation = prompt("Enter the equation")

//   // Creating empty arrays for storing
//   // brackets, operators, operands
//   var brackets = []
//   var operators = []
//   var operands = []
//   var operandString = ""


//   for (var index = 0, operatorIndex = 0, bracketIndex = 0; index < equation.length; index++) {

//       // Checking for operators
//       if (equation.charAt(index) == '+'
//           || equation.charAt(index) == '-'
//           || equation.charAt(index) == '*'
//           || equation.charAt(index) == '/') {

//           // Below condition is to deal with (a+b)+(c+d) this part of equation
//           if (equation.charAt(index - 1) == ')' && equation.charAt(index + 1) == '(') {
//               operators[operatorIndex++] = "*"
//               brackets[bracketIndex++] = null
//               brackets[bracketIndex++] = null
//               operators[operatorIndex++] = equation.charAt(index)
//               operandString += " 1 "
//           }
//           // Fetching operators and storing into operators[] array
//           else {
//               operators[operatorIndex++] = equation.charAt(index)
//               brackets[bracketIndex++] = null

//               operandString += " "
//           }
//       }
//       // Fetching brackets and storing into brackets[] array
//       else if (equation.charAt(index) == '(' || equation.charAt(index) == ')') {
//           brackets[bracketIndex++] = equation.charAt(index)
//           operators[operatorIndex++] = null
//       }
//       // Fetching operand digits and storing into operandString
//       else {
//           operandString += equation.charAt(index)
//       }
//   }

//   // Temp array of operands for further processing
//   // before storing operands into operands[] array
//   operandsTemp = operandString.split(" ")

//   // Storing operands into operands[] array
//   for (var index = 0, indexOperand = 0; index < operators.length; index++) {
//       if (brackets[index] == null) {
//           operands[index] = Number(operandsTemp[indexOperand++])
//       }
//       else {
//           operands[index] = null
//       }
//   }
//   operands[operands.length] = Number(operandsTemp[indexOperand])



//   console.log(brackets)
//   console.log(operators)
//   console.log(operands)


//   // Result variables
//   var result = 0
//   var finalResult = 0

//   // Checking if brackets are present in the equation or not
//   if (brackets.length > 0) {

//       for (var index = 0; index < brackets.length; index++) {

//           // Checking for occurance of closing bracket
//           // and then searching for its corresponding
//           // opening bracket by reverse traversing
//           // and then evaluating that particular bracket equation
//           // PROCESSES NESTED BRACKETS AS WELL
//           if (brackets[index] == ')') {
//               var indexBracketEnd = index
//               for (var indexBracket = indexBracketEnd; indexBracket >= 0; indexBracket--) {
//                   if (brackets[indexBracket] == '(') {
//                       var indexBracketStart = indexBracket
//                       evaluate(indexBracketStart, indexBracketEnd, operators, operands)
//                       brackets[indexBracketStart] = null
//                       brackets[indexBracketEnd] = null
//                       break
//                   }
//               }
//               console.log(brackets)
//           }
//       }
//   }



//   // This will evaluate remaining equation (without brackets)
//   // after processing brackets (if available)
//   finalResult = evaluate(0, operators.length, operators, operands)


//   // FINAL RESULT
//   console.log(`FINAL RESULT = ${finalResult}`)

//   document.getElementById('result').value = finalResult
// }

// // Evaluation of equation by using BOAD MASS method
// function evaluate(indexStart, indexEnd, operators, operands) {

//   // First evaluating MULTIPLICATION and DIVISION
//   for (var index = indexStart; index < indexEnd; index++) {

//       var indexFirstOperand = index
//       var indexNextOperand = index + 1
//       var indexNextOperator = index

//       if (operators[indexNextOperator] == null) {
//           for (var indexNext = indexNextOperator + 1; indexNext < operators.length; indexNext++) {
//               if (operators[indexNext] != null) {
//                   indexNextOperator = indexNext
//                   indexFirstOperand = indexNext
//                   indexNextOperand = indexNext + 1
//                   index = indexNext - 1
//                   break
//               }
//           }
//       }

//       if (operands[indexNextOperand] == null) {
//           for (var indexNext = indexNextOperand + 1; indexNext < operands.length; indexNext++) {
//               if (operands[indexNext] != null) {
//                   indexNextOperand = indexNext
//                   index = indexNext - 1
//                   break
//               }
//           }
//       }

//       // MULTIPLICATION 
//       if (operators[indexNextOperator] == '*') {
//           result = operands[indexFirstOperand] * operands[indexNextOperand]

//           operands[indexNextOperand] = result
//           operands[indexFirstOperand] = null
//           operators[indexNextOperator] = null
//           finalResult = result
//           result = 0

//           console.log(operands)
//           console.log(operators)
//       }
//       // DIVISION
//       else if (operators[indexNextOperator] == '/') {
//           result = operands[indexFirstOperand] / operands[indexNextOperand]

//           operands[indexNextOperand] = result
//           operands[indexFirstOperand] = null
//           operators[indexNextOperator] = null
//           finalResult = result
//           result = 0

//           console.log(operands)
//           console.log(operators)
//       }
//   }

//   // Next evaluating ADDITION and SUBSTRACTION
//   for (var index = indexStart; index < indexEnd; index++) {

//       var indexFirstOperand = index
//       var indexNextOperand = index + 1
//       var indexNextOperator = index

//       if (operators[indexNextOperator] == null) {
//           for (var indexNext = indexNextOperator + 1; indexNext < operators.length; indexNext++) {
//               if (operators[indexNext] != null) {
//                   indexNextOperator = indexNext
//                   indexFirstOperand = indexNext
//                   indexNextOperand = indexNext + 1
//                   index = indexNext - 1
//                   break
//               }
//           }
//       }

//       if (operands[indexNextOperand] == null) {
//           for (var indexNext = indexNextOperand + 1; indexNext < operands.length; indexNext++) {
//               if (operands[indexNext] != null) {
//                   indexNextOperand = indexNext
//                   index = indexNext - 1
//                   break
//               }
//           }
//       }

//       // ADDITION 
//       if (operators[indexNextOperator] == '+') {
//           result = operands[indexFirstOperand] + operands[indexNextOperand]

//           operands[indexNextOperand] = result
//           operands[indexFirstOperand] = null
//           operators[indexNextOperator] = null
//           finalResult = result
//           result = 0

//           console.log(operands)
//           console.log(operators)
//       }
//       // SUBSTRACTION
//       else if (operators[indexNextOperator] == '-') {
//           result = operands[indexFirstOperand] - operands[indexNextOperand]

//           operands[indexNextOperand] = result
//           operands[indexFirstOperand] = null
//           operators[indexNextOperator] = null
//           finalResult = result
//           result = 0

//           console.log(operands)
//           console.log(operators)
//       }
//   }

//   // Returning FINAL RESULT
//   return finalResult
// }


















// function calculateExpression(expression) {
//     // Function to handle operations based on BODMAS
//     function performOperation(op, a, b) {
//       switch (op) {
//         case '+': return a + b;
//         case '-': return a - b;
//         case '*': return a * b;
//         case '/': return a / b;
//         case '%': return a % b;
//         default: throw new Error(`Unknown operator: ${op}`);
//       }
//     }
  
//     // Function to handle parentheses and recursively evaluate expressions within them
//     function evaluateParentheses(expr) {
//       let start = expr.indexOf('(');
//       let end = expr.lastIndexOf(')');
//       if (start !== -1 && end !== -1) {
//         const innerExpr = expr.substring(start + 1, end);
//         const innerResult = calculateExpression(innerExpr);
//         return evaluateParentheses(expr.substring(0, start) + innerResult + expr.substring(end + 1));
//       } else {
//         return expr;
//       }
//     }
  
//     // Main evaluation loop
//     while (expression.length > 1) {
//       expression = evaluateParentheses(expression);
  
//       // Find the highest priority operation
//       const ops = ['%', '*', '/', '+', '-'];
//       const opIndex = ops.findIndex(op => expression.includes(op));
//       const op = ops[opIndex];
  
//       if (op !== undefined) {
//         const parts = expression.split(op);
//         const result = performOperation(op, parseFloat(parts[0]), parseFloat(parts[1]));
//         expression = parts[0] + result + parts[2]; // Replace the operands and operator with the result
//       }
//     }
  
//     return parseFloat(expression);
//   }
  
//   const str1 = "(((100+54)-45)/9)*((54%22)*4)";
//   const result = calculateExpression(str1);
//   console.log(result); // Output: 96
  











// let arrstr = ["(", "(", "(", "1", "0", "0", "+", "5", "4", ")", "-", "4", "5", ")", "/", "5", "4", "5", ")", "*", "(", "(", "5", "4", "5", "4", "%", "2", "2", ")", "*", "4", "5", "4", "5", ")"];


// const data = {
//     numbers: [],
//     operators: []
// };

// let str = arrstr.join('');

// console.log(str)

// for (let i = 0; i < str.length; i++) {
//     const currentChar = str[i];

//     if (/[0-9.]/.test(currentChar)) {
//         // If the character is a digit or a dot, start building the number
//         let number = currentChar;

//         // Continue adding digits and dots until a non-digit, non-dot character is encountered
//         while (i + 1 < str.length && /[0-9.]/.test(str[i + 1])) {
//             i++;
//             number += str[i];
//         }

//         // Push the constructed number into the 'numbers' array
//         data.numbers.push(parseFloat(number));
//     } else {
//         // If the character is not a digit or dot, it is an operator
//         data.operators.push(currentChar);
//     }
// }

// console.log(data.numbers)
// console.log(data.operators)