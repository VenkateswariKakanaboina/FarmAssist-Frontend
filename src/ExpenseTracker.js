import React, { useEffect, useState } from "react";
import "./ExpenseTracker.css";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [input, setInput] = useState({ type: "", amount: "" });

  // ✅ Load expenses from backend when component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ No token found. Please log in.");
          return;
        }

        const res = await fetch("http://localhost:5000/api/expenses", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });

        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setExpenses(data);
          console.log("✅ Loaded expenses from backend:", data);
        } else {
          console.warn("⚠️ Failed to fetch expenses or none found.");
        }
      } catch (error) {
        console.error("❌ Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const addExpense = async () => {
    if (input.type && input.amount) {
      // ✅ Update UI instantly
      const newExpense = { type: input.type, amount: input.amount };
      setExpenses([...expenses, newExpense]);
      setInput({ type: "", amount: "" });

      // ✅ Also send expense to backend
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://farmassist-backend-2.onrender.com/api/expenses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify(newExpense)
        });

        const data = await res.json();
        if (res.ok) {
          console.log("✅ Expense saved to backend:", data);
        } else {
          console.warn("⚠️ Failed to save expense:", data);
        }
      } catch (error) {
        console.error("❌ Error saving expense:", error);
      }
    }
  };

  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

  return (
    <div className="expense-box">
      <h3>💰 Farming Expenses</h3>

      <div className="expense-form">
        <input
          type="text"
          placeholder="Type (e.g., Fertilizer)"
          value={input.type}
          onChange={(e) => setInput({ ...input, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={input.amount}
          onChange={(e) => setInput({ ...input, amount: e.target.value })}
        />
        <button onClick={addExpense}>Add</button>
      </div>

      <ul className="expense-list">
        {expenses.map((e, i) => (
          <li key={i}>
            {e.type} — ₹{e.amount}
          </li>
        ))}
      </ul>

      <h4>Total: ₹{total}</h4>
    </div>
  );
};

export default ExpenseTracker;
