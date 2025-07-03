import React, { useState, useEffect } from "react";
import "./App.css";

const buttons = [
  { id: "clear", label: "AC" },
  { id: "divide", label: "/" },
  { id: "multiply", label: "*" },
  { id: "seven", label: "7" },
  { id: "eight", label: "8" },
  { id: "nine", label: "9" },
  { id: "subtract", label: "-" },
  { id: "four", label: "4" },
  { id: "five", label: "5" },
  { id: "six", label: "6" },
  { id: "add", label: "+" },
  { id: "one", label: "1" },
  { id: "two", label: "2" },
  { id: "three", label: "3" },
  { id: "equals", label: "=" },
  { id: "zero", label: "0" },
  { id: "decimal", label: "." }
];

export default function App() {
  const [formula, setFormula] = useState("0");
  const [current, setCurrent] = useState("0");
  const [evaluated, setEvaluated] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  const handleKey = (e) => {
    const key = e.key;
    if (/\d/.test(key)) handleNumber(key);
    else if ("+-*/".includes(key)) handleOperator(key);
    else if (key === ".") handleDecimal();
    else if (key === "Enter" || key === "=") handleEquals();
    else if (key === "Backspace" || key.toLowerCase() === "c") handleClear();
  };

  const handleNumber = (num) => {
    if (evaluated) {
      setFormula(num);
      setCurrent(num);
      setEvaluated(false);
    } else {
      if (current === "0" && num === "0") return;
      if (/[\+\-\*/]0$/.test(formula)) {
        setFormula(formula.slice(0, -1) + num);
      } else {
        const newFormula = formula === "0" ? num : formula + num;
        setFormula(newFormula);
      }
      setCurrent((prev) => (prev === "0" ? num : prev + num));
    }
  };

  const handleOperator = (op) => {
    if (evaluated) {
      setFormula(current + op);
      setEvaluated(false);
    } else {
      const last = formula.slice(-1);
      if ("+-*/".includes(last)) {
        if (op === "-" && last !== "-") {
          setFormula(formula + op);
        } else {
          let newFormula = formula;
          if (/[\+\-\*/]{2}$/.test(formula)) {
            newFormula = formula.slice(0, -2) + op;
          } else {
            newFormula = formula.slice(0, -1) + op;
          }
          setFormula(newFormula);
        }
      } else {
        setFormula(formula + op);
      }
    }
    setCurrent(op);
  };

  const handleDecimal = () => {
    if (evaluated) {
      setFormula("0.");
      setCurrent("0.");
      setEvaluated(false);
    } else if (!current.includes(".")) {
      setFormula(formula + ".");
      setCurrent(current + ".");
    }
  };

  const handleEquals = () => {
    try {
      let result = eval(formula.replace(/--/g, "+")); // Replace -- with +
      result = parseFloat(result.toFixed(10));
      setFormula(result.toString());
      setCurrent(result.toString());
      setEvaluated(true);
    } catch (e) {
      setFormula("0");
      setCurrent("0");
    }
  };

  const handleClear = () => {
    setFormula("0");
    setCurrent("0");
    setEvaluated(false);
  };

  const handleClick = (value) => {
    if (/\d/.test(value)) handleNumber(value);
    else if ("+-*/".includes(value)) handleOperator(value);
    else if (value === ".") handleDecimal();
    else if (value === "=") handleEquals();
    else handleClear();
  };

  return (
    <div id="calculator">
      <div id="display-container">
        <div id="formula">{formula}</div>
        <div id="display">{current}</div>
      </div>
      <div id="buttons">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            id={btn.id}
            onClick={() => handleClick(btn.label)}
            className={btn.label === "=" ? "equals" : "button"}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
