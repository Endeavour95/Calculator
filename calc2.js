let arrstr = [];

document.addEventListener("DOMContentLoaded", function () {
    function updateData(value) {
        switch (value) {
            case 'C':
                arrstr = [];
                break;
            case '⌫':
                arrstr.pop();
                break;
            case '/':
            case '*':
            case '+':
            case '.':
                arrstr.push(value);
                break;
            case '-':
                arrstr.push(value);
                break;
            default:
                arrstr.push(value);
                break;
        }
    }

    function display(val) {
        if (val == "=") {
            // let  = [];
            // res = evaluateExpression().split[''];

            // if (res[0] == '-') {
            //     updateData(0);
            //     res.forEach(element => {
            //         updateData(element);
            //     });
            // }
            // resultInput.value = arrstr.join('');

            // resultInput.value = arrstr.join('');

            resultInput.value = evaluateExpression();
        } else {
            resultInput.value = arrstr.join('');
        }
    }

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

        continues(temparr)

        function continues(params) {
            operatorsPrecedence.forEach(operator => {
                let index = 0;
                while (data.operators.includes(operator)) {
                    if (operator == "/") {
                        index = data.operators.indexOf(operator, index);
                        let temparr = data.operators.splice(0, index + 1);
                        if (temparr.includes('*')) {
                            
                        }
                    }
    
                    else {
                        index = data.operators.indexOf(operator, index);
                        const leftOperand = data.numbers[index];
                        const rightOperand = data.numbers[index + 1];
                        let result = calculate(operator, leftOperand, rightOperand);
    
    
    
                        // Update numbers and operators arrays with the result
                        data.numbers.splice(index, 2, result);
                        data.operators.splice(index, 1);
                        index++;
                    }
                }
            });
        }

        function calculate(operator, leftOperand, rightOperand) {
            switch (operator) {
                case '%':
                    return (leftOperand / 100) * rightOperand;
                case '*': // Multiply and divide before adding and subtracting
                case '/':
                    return operator === '*' ? leftOperand * rightOperand : leftOperand / rightOperand;
                case '+':
                case '-':
                    return operator === '+' ? leftOperand + rightOperand : leftOperand - rightOperand;
                default:
                    break;
            }
        }

        // const operatorsPrecedence = ['%', '/', '*', '+', '-'];

        // // Calculate result based on operator precedence (BODMAS)

        // operatorsPrecedence.forEach(operator => {
        //     let index = 0;
        //     while (data.operators.includes(operator)) {
        //         index = data.operators.indexOf(operator, index);
        //         // while (data.operators.length > 0) {            
        //         //     index = data.operators.indexOf('%', index);
        //         // const operator = data.operators[0];
        //         // const index = data.operators.indexOf(operator);
        //         const leftOperand = data.numbers[index];
        //         const rightOperand = data.numbers[index + 1];
        //         let result;

        //         switch (operator) {
        //             case '%':
        //                 result = (leftOperand / 100) * rightOperand;
        //                 break;
        //             case '*': // Multiply and divide before adding and subtracting
        //             case '/':
        //                 result = operator === '*' ? leftOperand * rightOperand : leftOperand / rightOperand;
        //                 break;
        //             case '+':
        //             case '-':
        //                 result = operator === '+' ? leftOperand + rightOperand : leftOperand - rightOperand;
        //                 break;
        //             default:
        //                 break;
        //         }

        //         // Update numbers and operators arrays with the result
        //        data.numbers.splice(index, 2, result);
        //        data.operators.splice(index, 1);
        //         index++;
        //     }
        // });

        arrstr = [];
        // arrstr.push(data.numbers[0]);
        // return arrstr.join('');

        let res = data.numbers[0].toString();
        let resarr = res.split('');

        if (resarr[0] == '-') {
            updateData(0);
            resarr.forEach(element => {
                updateData(element);
            });
        }

        return arrstr.join('');












        // Calculate the result from left to right
        // while (data.operators.length > 0) {
        //   const operator = data.operators[0];
        //   const index = data.operators.indexOf(operator);
        //   const leftOperand = data.numbers[index];
        //   const rightOperand = data.numbers[index + 1];
        //   let result;

        //   switch (operator) {
        //     case '%':
        //       result = (leftOperand / 100) * rightOperand;
        //       break;
        //     case '*': // Multiply and divide before adding and subtracting
        //     case '/':
        //       result = operator === '*' ? leftOperand * rightOperand : leftOperand / rightOperand;
        //       break;
        //     case '+':
        //     case '-':
        //       result = operator === '+' ? leftOperand + rightOperand : leftOperand - rightOperand;
        //       break;
        //     default:
        //       break;
        //   }

        //   // Update numbers and operators arrays with the result
        //   data.numbers.splice(index, 2, result);
        //   data.operators.splice(index, 1);
        // }

        // console.log("Result:", data.numbers[0]);
    }




    let resultInput = document.getElementById("result");

    const buttons = document.querySelectorAll("#calcu input[type='button']");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            handleButtonClick(button.value);
        });
    });

    function handleButtonClick(value) {
        switch (value) {
            case "C":
                updateData(value);
                display(value);
                break;
            case "⌫":
                updateData(value);
                display(value);
                break;
            case "=":
                try {
                    if (arrstr.length < 1) {
                        display(false);
                    } else {
                        if (['%', '/', '*', '+', '-', '.'].includes(arrstr[arrstr.length - 1])) {
                            updateData(0);
                            display(value);
                        } else {
                            display(value);
                        }
                    }
                } catch (error) {
                    // updateData(error);
                    // display(false);
                    console.log(error);
                    display(false);
                }
                break;
            case "%":
            case '/':
            case '*':
            case '+':
            case '-':
            case '.':
                if (arrstr.length < 1) {
                    if (value == '-' || value == '.') {
                        updateData(0);
                        updateData(value);
                        display(value);
                    } else {
                        display(value);
                    }
                } else {
                    if (value == '.') {
                        let check = [];
                        if (Number(arrstr[arrstr.length - 1]) || arrstr[arrstr.length - 1] == 0) {
                            for (let i = arrstr.length - 1; !['%', '/', '*', '+', '-'].includes(arrstr[i]) && i >= 0; i--) {
                                check.push(arrstr[i]);
                            }
                            // if (parseFloat(check)) {
                            //     display(value);
                            // } else {
                            if (check.includes('.')) {
                                display(value);
                            } else {
                                updateData(value);
                                display(value);
                            }
                        }
                        else if (['%', '/', '*', '+', '-'].includes(arrstr[arrstr.length - 1])) {
                            updateData(0);
                            updateData(value);
                            display(value);
                        }
                        else {
                            display(value);
                        }
                    } else {
                        if (arrstr[arrstr.length - 1] == '.') {
                            updateData(0);
                            updateData(value);
                            display(value);
                        } else
                            if (Number(arrstr[arrstr.length - 1]) || arrstr[arrstr.length - 1] == 0) {
                                updateData(value);
                                display(value);
                            }
                            else {
                                display(value);
                            }
                    }
                }
                break;
            default:
                updateData(value);
                display(value);
        }
    }
});
















// function evaluateExpression() {
//     let str = arrstr.join('');

//     // Regular expression to match numbers and operators
//     const regex = /(\d+(\.\d+)?|[\+\-\*\/\%])/g;

//     // Extract numbers and operators from the string
//     const elements = str.match(regex);

//     // seperate numbers and operators
//     elements.forEach(element => {
//         if (/[0-9]/.test(element) || element === '.') {
//             data.numbers.push(parseFloat(element));
//         } else {
//             data.operators.push(element);
//         }
//     });

//     // Calculate result based on operator precedence BODMAS rule
//     const operatorsPrecedence = ['%', '/', '*', '+', '-'];

// operatorsPrecedence.forEach(operator => {
//     while (data.operators.includes(operator)) {
//         const index = data.operators.indexOf(operator);
//             const leftOperand = data.numbers[index];
//             const rightOperand = data.numbers[index + 1];
//             let result;

//             switch (operator) {
//                 case '%':
//                     result = (leftOperand / 100) * rightOperand;
//                     break;
//                 case '/':
//                     result = leftOperand / rightOperand;
//                     break;
//                 case '*':
//                     result = leftOperand * rightOperand;
//                     break;
//                 case '+':
//                     result = leftOperand + rightOperand;
//                     break;
//                 case '-':
//                     result = leftOperand - rightOperand;
//                     break;
//                 default:
//                     break;
//             }

//             // Update numbers and operators arrays with the result
//             data.numbers.splice(index, 2, result);
//             data.operators.splice(index, 1);
//         }
//     });

//     // console.log("Result:", data.numbers[0]);
//     arrstr = [];
//     arrstr.push(data.numbers[0]);
//     return arrstr.join('');

//     // }
// }

// function processData() {
//     let str = arrstr.join('');
//     data.numbers = [];
//     data.operators = [];

//     for (let i = 0; i < str.length; i++) {
//         const currentChar = str[i];

//         if (/[0-9.]/.test(currentChar)) {
//             let number = currentChar;
//             while ((i + 1 < str.length) && (/[0-9.]/.test(str[i + 1]))) {
//                 i++;
//                 number += str[i];
//             }
//             data.numbers.push(parseFloat(number));
//         } else {
//             data.operators.push(currentChar);
//         }
//     }
// }

// function resetData() {
//     arrstr = [];
//     data.numbers = [];
//     data.operators = [];
// }













// document.addEventListener("DOMContentLoaded", function () {
//     const data = {
//         numbers: [],
//         operators: []
//     };

//     function clearResult() {
//         document.getElementById('result').value = '';
//         clearData();
//     }

//     function appendToResult(value) {
//         document.getElementById('result').value += value;
//     }

//     function backspace() {
//         const currentValue = document.getElementById('result').value;
//         document.getElementById('result').value = currentValue.slice(0, -1);
//         clearData();
//     }

//     function calculateResult() {
//         const inputString = document.getElementById('result').value;

//         // Clear previous data
//         clearData();

//         // Regular expression to match numbers and operators
//         const regex = /(\d+(\.\d+)?|[\+\-\*\/\%])/g;

//         // Extract numbers and operators from the string
//         const elements = inputString.match(regex);

//         // Populate numbers and operators arrays
//         elements.forEach(element => {
//             if (/[0-9]/.test(element) || element === '.') {
//                 data.numbers.push(parseFloat(element));
//             } else {
//                 data.operators.push(element);
//             }
//         });

//         // Calculate result based on operator precedence (BODMAS/BIDMAS) rule
//         const operatorsPrecedence = ['%', '*', '/', '+', '-'];

//         operatorsPrecedence.forEach(operator => {
//             while (data.operators.includes(operator)) {
//                 const index = data.operators.indexOf(operator);
//                 const leftOperand = data.numbers[index];
//                 const rightOperand = data.numbers[index + 1];
//                 let result;

//                 switch (operator) {
//                     case '%':
//                         result = (leftOperand / 100) * rightOperand;
//                         break;
//                     case '*':
//                         result = leftOperand * rightOperand;
//                         break;
//                     case '/':
//                         result = leftOperand / rightOperand;
//                         break;
//                     case '+':
//                         result = leftOperand + rightOperand;
//                         break;
//                     case '-':
//                         result = leftOperand - rightOperand;
//                         break;
//                     default:
//                         break;
//                 }

//                 // Update numbers and operators arrays with the result
//                 data.numbers.splice(index, 2, result);
//                 data.operators.splice(index, 1);
//             }
//         });

//         // Display the result
//         document.getElementById('result').value = data.numbers[0];
//     }

//     function clearData() {
//         // Clear data arrays
//         data.numbers = [];
//         data.operators = [];
//     }
// });