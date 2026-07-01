import { useState } from "react";
import "./App.css";

function App() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!expenseName || !amount) return;

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: amount,
    };

    setExpenses([...expenses, newExpense]);

    setExpenseName("");
    setAmount("");
  }

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">
          Add Expense
        </button>
      </form>

      <div className="expenses">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense">
            <span>{expense.name}</span>
            <span>₹{expense.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;