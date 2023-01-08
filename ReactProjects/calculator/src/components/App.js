import React, { useEffect, useState } from "react";

import Header from "./Header";
import Keypad from "./Keypad";

import "./App.css";
import moonIcon from "../assets/moon.png";
import sunIcon from "../assets/sun.png";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("calculator-app-mode")) ?? false
  );
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("calculator-app-history")) ?? []
  );

  const handleKeyPress = (keycode, key) => {
    if (!keycode) return;

    if (!usedKeyCodes.includes(keycode)) return;

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExpression(expression + key);
    } else if (operators.includes(key)) {
      if (expression.length === 0) return;

      const lastChar = expression.slice(-1);

      if (operators.includes(lastChar)) return;

      if (lastChar === ".") return;

      setExpression(expression + key);
    } else if (keycode === 13) {
      if (!expression) return;

      calculateResult(expression);
      let tempHistory = [...history];
      if (tempHistory.length > 20) {
        tempHistory = tempHistory.splice(0, 1);
      }
      tempHistory.push(expression);
      setHistory(tempHistory);
    } else if (keycode === 8) {
      if (!expression) {
        setResult(0);
        return;
      }

      calculateResult(expression.slice(0, -1));

      setExpression(expression.slice(0, -1));
    } else if (key === ".") {
      if (!expression) return;

      if (expression.length === 0) return;

      const lastChar = expression.slice(-1);

      if (operators.includes(lastChar)) return;

      if (lastChar === ".") return;

      // if in somewhere there is a decimal
      let ind = expression.length - 1;
      while (ind !== 0) {
        if (expression[ind] === ".") return;

        if (operators.includes(expression[ind])) break;

        ind -= 1;
      }

      setExpression(expression + key);
    }
  };

  const calculateResult = (exp) => {
    if (!exp) return;

    const lastChar = exp.slice(-1);

    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const result = eval(exp).toFixed(2) + "";

    setResult(result);
  };

  useEffect(() => {
    localStorage.setItem("calculator-app-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(history));
  }, [history]);

  return (
    <div
      className="app"
      data-theme={isDarkMode ? "dark" : ""}
      tabIndex="0"
      onKeyDown={(e) => {
        handleKeyPress(e.keyCode, e.key);
      }}
    >
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div
            className="app_calculator_navbar_toggle"
            onClick={(e) => setIsDarkMode(!isDarkMode)}
          >
            <div
              className={`app_calculator_navbar_toggle_circle ${
                isDarkMode ? "app_calculator_navbar_toggle_circle_active" : ""
              }`}
            />
          </div>
          <img src={isDarkMode ? moonIcon : sunIcon} alt="mode"></img>
        </div>
        <Header expression={expression} result={result} history={history} />
        <Keypad onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
};

export default App;
