document.addEventListener('DOMContentLoaded', () => {
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('[data-operator]');
    const equalsButton = document.getElementById('equals');
    const deleteButton = document.getElementById('delete');
    const clearButton = document.getElementById('clear');
    const previousOperandTextElement = document.querySelector('.previous-operand');
    const currentOperandTextElement = document.querySelector('.current-operand');

    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;

    const updateDisplay = () => {
        currentOperandTextElement.innerText = formatNumber(currentOperand);
        if (operation != null) {
            previousOperandTextElement.innerText = `${formatNumber(previousOperand)} ${operation}`;
        } else {
            previousOperandTextElement.innerText = '';
        }
    };
    
    const formatNumber = (number) => {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay},${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    const appendNumber = (number) => {
        if (number === '.' && currentOperand.includes('.')) return;
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number.toString();
        } else {
            currentOperand = currentOperand.toString() + number.toString();
        }
    };

    const chooseOperation = (op) => {
        if (currentOperand === '' && previousOperand !== '') {
             operation = op;
             return;
        }
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("Não é possível dividir por zero!");
                    clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = undefined;
        previousOperand = '';
    };

    const clear = () => {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
    };

    const deleteNumber = () => {
        if (currentOperand.length <= 1) {
            currentOperand = '0';
        } else {
            currentOperand = currentOperand.toString().slice(0, -1);
        }
    };

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.innerText);
            updateDisplay();
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.innerText);
            updateDisplay();
        });
    });

    equalsButton.addEventListener('click', () => {
        compute();
        updateDisplay();
    });

    clearButton.addEventListener('click', () => {
        clear();
        updateDisplay();
    });

    deleteButton.addEventListener('click', () => {
        deleteNumber();
        updateDisplay();
    });
    
    updateDisplay(); // Initialize display
});
