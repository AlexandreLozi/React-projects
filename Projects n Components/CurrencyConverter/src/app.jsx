import { useState } from "preact/hooks";
import "./app.css";
import { useEffect } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export function App() {
  const host = "api.frankfurter.app";
  const [amount, setAmount] = useState();
  const [fromCurr, setFromCurr] = useState("");
  const [toCurr, setToCurr] = useState("");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchCurrency() {
        setIsLoading(true);

        try {
          const res = await fetch(
            `https://${host}/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
          );
          const data = await res.json();
          setConverted(data.rates[toCurr]);

          if (!res.ok)
            throw new Error("Something went wrong with converting currency");
        } catch (err) {
          console.error(err.message);
        }
      }
      if (fromCurr === toCurr) return setConverted(amount);

      fetchCurrency();
      setIsLoading(false);
    },
    [amount, fromCurr, toCurr]
  );

  const handleCurrencyChange1 = (event) => {
    setFromCurr(event.target.value);
  };

  const handleCurrencyChange2 = (event) => {
    setToCurr(event.target.value);
  };

  return (
    <div>
      <header>
        <p className="header">Currency Converter</p>
      </header>
      <div className="body">
        <input
          type="number"
          className="inputAmount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={isLoading}
          placeholder="0.00"
        />
        <select
          value={fromCurr}
          onChange={handleCurrencyChange1}
          disabled={isLoading}
          className="selectCurr"
        >
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="CAD">Canadian Dollar (CAD)</option>
          <option value="INR">Indian Rupee (INR)</option>
          <option value="BRL">Brazilian Real (BRL)</option>
          <option value="JPY">Japenese Yen (JPY)</option>
          <option value="GBP">Pound Sterling (GBP)</option>
        </select>
        <span className="arrow">➡️</span>
        <select
          value={toCurr}
          onChange={handleCurrencyChange2}
          disabled={isLoading}
          className="selectCurr"
        >
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="CAD">Canadian Dollar (CAD)</option>
          <option value="INR">Indian Rupee (INR)</option>
          <option value="BRL">Brazilian Real (BRL)</option>
          <option value="JPY">Japenese Yen (JPY)</option>
          <option value="GBP">Pound Sterling (GBP)</option>
        </select>
      </div>
      <p className="result">
        {converted} {toCurr}
      </p>
    </div>
  );
}
