// ReminderManager.js
import React, { useEffect, useState } from "react";
import "./ReminderManager.css";

const ReminderManager = ({ crop, processSteps, completed }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (!processSteps || processSteps.length === 0) return;

    // ✅ Filter only pending tasks
    const pending = processSteps
      .filter((step) => !completed.includes(step.week))
      .map((step) => ({
        id: step.week,
        title: `${crop} - Week ${step.week}: ${step.task}`,
        desc: step.desc,
      }));

    setReminders(pending);
    localStorage.setItem(`reminders_${crop}`, JSON.stringify(pending));
  }, [crop, processSteps, completed]);

  const clearReminder = (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    localStorage.setItem(`reminders_${crop}`, JSON.stringify(updated));
  };

  return (
    <div className="reminder-container">
      <h3>⏰ Active Reminders</h3>
      {reminders.length > 0 ? (
        <ul>
          {reminders.map((r) => (
            <li key={r.id} className="reminder-card">
              <div>
                <strong>{r.title}</strong>
                <p>{r.desc}</p>
              </div>
              <button onClick={() => clearReminder(r.id)}>❌ Clear</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>🎉 All activities are completed!</p>
      )}
    </div>
  );
};

export default ReminderManager;
