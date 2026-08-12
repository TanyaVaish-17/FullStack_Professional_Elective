import { useState } from "react";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [op, setOp] = useState("+");
  const [result, setResult] = useState("");

  const calculate = () => {
    let num1 = Number(a);
    let num2 = Number(b);
    let ans;

    switch (op) {
      case "+":
        ans = num1 + num2;
        break;

      case "-":
        ans = num1 - num2;
        break;

      case "*":
        ans = num1 * num2;
        break;

      case "/":
        if (num2 === 0) {
          setResult("Cannot divide by zero");
          return;
        }
        ans = num1 / num2;
        break;

      default:
        ans = "Invalid operation";
    }

    setResult(ans);
  };

  return (
    <div>
      <h1>Basic Calculator</h1>

      <input
        type="number"
        placeholder="Enter first number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />

      <br /><br />

      <select value={op} onChange={(e) => setOp(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Enter second number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <br /><br />

      <button onClick={calculate}>Calculate</button>

      <h2>Result: {result}</h2>
    </div>
  );
}

export default App;