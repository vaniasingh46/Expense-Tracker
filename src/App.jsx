import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [search, setSearch] = useState("");

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !amount) return;

    const expense = {
      id: Date.now(),
      name,
      amount: Number(amount),
      category,
    };

    setExpenses([...expenses, expense]);

    setName("");
    setAmount("");
    setCategory("Food");
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);


return (
  <div className="app-wrapper">
    <header className="app-header">
      <h1>Expense Tracker</h1>
    </header>

    <main className="main-layout">
      {/* LEFT COLUMN: Input Form */}
      <section className="form-panel">
        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Expense Name</label>
            <input
              type="text"
              placeholder="e.g., Grocery Shopping"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Amount</label>
            <input
              type="number"
              placeholder="₹0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Entertainment</option>
              <option>Bills</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">Add Expense</button>
        </form>
      </section>

      {/* RIGHT COLUMN: History & Active Metrics */}
      <section className="dashboard-panel">
        <div className="dashboard-header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="total-card">
            <span className="total-label">Total Spend</span>
            <span className="total-amount">₹{total}</span>
          </div>
        </div>

        <div className="expenses-list">
          {filteredExpenses.map((expense) => (
            <div className="expense-card" key={expense.id}>
              <div className="expense-info">
                <h3>{expense.name}</h3>
                <span className="tag">{expense.category}</span>
              </div>
              <div className="expense-actions">
                <span className="amount">₹{expense.amount}</span>
                <button onClick={() => deleteExpense(expense.id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
);

}

export default App;