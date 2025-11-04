const display = document.getElementById('display');


function appendValue(value) {
    
    if (display.value.length >= 20) return;

    
    const lastChar = display.value.slice(-1);
    const operators = "+-*/";
    if (operators.includes(lastChar) && operators.includes(value)) {
        display.value = display.value.slice(0, -1) + value; 
        return;
    }

    
    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;
    }
}


function clearDisplay() {
    display.value = "";
}


function deleteLast() {
    display.value = display.value.slice(0, -1);
}


function calculateResult() {
    try {
        const expr = display.value.trim();

        
        if (!/^[0-9+\-*/().% ]+$/.test(expr) || expr === "") {
            throw new Error("Invalid input");
        }

        
        let result = Function('"use strict";return (' + expr + ')')();

        
        if (!isFinite(result)) throw new Error("Invalid result");

        
        if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(5));
        }

        display.value = result;
    } catch (error) {
        display.value = "Error";
        
        setTimeout(() => display.value = "", 1000);
    }
}


const buttons = document.querySelectorAll("button");
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.add("pressed");
        setTimeout(() => btn.classList.remove("pressed"), 150);
    });
});


document.addEventListener('keydown', (e) => {
    const allowedKeys = '0123456789+-*/.=';
    if (allowedKeys.includes(e.key)) {
        if (e.key === '=') {
            calculateResult();
        } else if (e.key === '.') {
            appendValue('.');
        } else if ('0123456789+-*/'.includes(e.key)) {
            appendValue(e.key);
        }
    } else if (e.key === 'Enter') {
        calculateResult();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key.toLowerCase() === 'c') {
        clearDisplay();
    }
});
