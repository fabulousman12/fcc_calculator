
import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    // Handle negative sign after another operator (but not if we're already waiting for operand)
    if (nextOperation === '-' && waitingForOperand && operation && operation !== '-' && display !== '-') {
      setDisplay('-');
      setWaitingForOperand(false);
      return;
    }

    // If we're waiting for an operand and get another operator, just replace the current operation
    if (waitingForOperand && operation) {
      setOperation(nextOperation);
      return;
    }

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">
        {display}
      </div>
      
      <div className="buttons">
        <button id="clear" className="btn btn-clear" onClick={clear}>
          AC
        </button>
        <button className="btn btn-operator" onClick={() => performOperation('/')}>
          ÷
        </button>
        <button className="btn btn-operator" onClick={() => performOperation('*')}>
          ×
        </button>
        <button className="btn btn-operator" onClick={() => performOperation('-')}>
          −
        </button>

        <button id="seven" className="btn" onClick={() => inputNumber(7)}>
          7
        </button>
        <button id="eight" className="btn" onClick={() => inputNumber(8)}>
          8
        </button>
        <button id="nine" className="btn" onClick={() => inputNumber(9)}>
          9
        </button>
        <button id="add" className="btn btn-operator" onClick={() => performOperation('+')}>
          +
        </button>

        <button id="four" className="btn" onClick={() => inputNumber(4)}>
          4
        </button>
        <button id="five" className="btn" onClick={() => inputNumber(5)}>
          5
        </button>
        <button id="six" className="btn" onClick={() => inputNumber(6)}>
          6
        </button>
        <button id="subtract" className="btn btn-operator" onClick={() => performOperation('-')}>
          −
        </button>

        <button id="one" className="btn" onClick={() => inputNumber(1)}>
          1
        </button>
        <button id="two" className="btn" onClick={() => inputNumber(2)}>
          2
        </button>
        <button id="three" className="btn" onClick={() => inputNumber(3)}>
          3
        </button>
        <button id="multiply" className="btn btn-operator" onClick={() => performOperation('*')}>
          ×
        </button>

        <button id="zero" className="btn btn-zero" onClick={() => inputNumber(0)}>
          0
        </button>
        <button id="decimal" className="btn" onClick={inputDecimal}>
          .
        </button>
        <button id="divide" className="btn btn-operator" onClick={() => performOperation('/')}>
          ÷
        </button>
        <button id="equals" className="btn btn-equals" onClick={handleEquals}>
          =
        </button>
      </div>
    </div>
  );
}
