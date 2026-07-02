import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !amount) return;

    const expense = {
      id: Date.now(),
      name,
      amount: Number(amount),
      category
    };

    setExpenses([...expenses, expense]);

    setName("");
    setAmount("");
    setCategory("Food");
  }

  function deleteExpense(id) {
    setExpenses(
      expenses.filter(
        expense => expense.id !== id
      )
    );
  }

  const total = expenses.reduce(
    (sum, expense) =>
      sum + expense.amount,
    0
  );

  return (
    <div className="container">

      <h1>Expense Tracker</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Expense Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Bills</option>

        </select>

        <button type="submit">
          Add Expense
        </button>

      </form>

      <h2>
        Total: ₹{total}
      </h2>

      <div className="expenses">

        {expenses.map(expense => (

          <div
            className="expense"
            key={expense.id}
          >

            <div>

              <h3>
                {expense.name}
              </h3>

              <p>
                {expense.category}
              </p>

            </div>

            <div>

              <p>
                ₹{expense.amount}
              </p>

              <button
                onClick={() =>
                  deleteExpense(
                    expense.id
                  )
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;