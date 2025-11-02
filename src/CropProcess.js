import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CropProcess.css";
import ReminderManager from "./ReminderManager";

const cropProcesses = {
  Rice: [
    { week: 1, task: "Land Preparation", desc: "Plough the field and remove weeds." },
    { week: 2, task: "Seed Sowing", desc: "Sow high-quality rice seeds with 20–25 cm spacing." },
    { week: 4, task: "Irrigation", desc: "Maintain shallow water during early stages." },
    { week: 6, task: "Fertilization", desc: "Apply Urea and DAP as per soil test." },
    { week: 8, task: "Weed Control", desc: "Use herbicides or manual weeding." },
    { week: 12, task: "Pest Monitoring", desc: "Check for leaf folder or stem borer." },
    { week: 16, task: "Harvesting", desc: "Harvest when grains turn golden and firm." },
  ],
  Wheat: [
    { week: 1, task: "Land Preparation", desc: "Plough and level the field properly." },
    { week: 2, task: "Sowing", desc: "Use certified seeds, maintain 20 cm spacing." },
    { week: 4, task: "Irrigation", desc: "Provide first irrigation after 20 days." },
    { week: 6, task: "Weeding", desc: "Remove weeds manually or with herbicides." },
    { week: 8, task: "Fertilization", desc: "Apply urea (50 kg/acre)." },
    { week: 12, task: "Pest Control", desc: "Monitor for aphids and rust." },
    { week: 16, task: "Harvesting", desc: "Harvest when crop turns golden brown." },
  ],
  Maize: [
    { week: 1, task: "Land Preparation", desc: "Add organic manure, plough the soil." },
    { week: 2, task: "Sowing", desc: "Sow seeds 75 cm apart." },
    { week: 4, task: "Irrigation", desc: "Irrigate weekly to support growth." },
    { week: 6, task: "Weeding", desc: "Control weeds manually or chemically." },
    { week: 8, task: "Fertilization", desc: "Apply urea during knee-high stage." },
    { week: 12, task: "Pest Control", desc: "Check for stem borers and aphids." },
    { week: 16, task: "Harvesting", desc: "Harvest when cobs are dry and firm." },
  ],
};

// ✅ Optional export so Selectcrop.js can call it
export const saveCropProcess = (crop, state, season) => {
  const process = cropProcesses[crop];
  if (!process) return;
  const key = `timeline_${state}_${season}_${crop}`;
  localStorage.setItem(key, JSON.stringify(process));
};

const CropProcess = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const crop = searchParams.get("crop") || "Rice";

  const process = cropProcesses[crop] || [];
  const [completed, setCompleted] = useState([]);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const storedCompleted = JSON.parse(localStorage.getItem(`completed_${crop}`)) || [];
    const storedNotes = JSON.parse(localStorage.getItem(`notes_${crop}`)) || {};
    setCompleted(storedCompleted);
    setNotes(storedNotes);
  }, [crop]);

  useEffect(() => {
    localStorage.setItem(`completed_${crop}`, JSON.stringify(completed));
    localStorage.setItem(`notes_${crop}`, JSON.stringify(notes));
  }, [completed, notes, crop]);

  // ✅ Added backend sync function
  const syncWithBackend = async (week, task, status, note = "") => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://farmassist-backend-2.onrender.com/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          crop,
          week,
          activity: task,
          status,
          notes: note
        })
      });
      const data = await res.json();
      console.log("✅ Synced with backend:", data);
    } catch (err) {
      console.error("❌ Failed to sync with backend:", err);
    }
  };

  const toggleDone = (week) => {
    setCompleted((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]
    );

    const step = process.find((s) => s.week === week);
    const status = completed.includes(week) ? "pending" : "done";
    // ✅ Sync with backend when user marks as done
    syncWithBackend(week, step.task, status, notes[week] || "");
  };

  const addNote = (week) => {
    const newNote = prompt(`Add a note for Week ${week}:`, notes[week] || "");
    if (newNote !== null) {
      setNotes((prev) => ({ ...prev, [week]: newNote }));
      const step = process.find((s) => s.week === week);
      // ✅ Sync new note with backend
      syncWithBackend(week, step.task, completed.includes(week) ? "done" : "pending", newNote);
    }
  };

  const reportIssue = (week) => {
    const issue = prompt(`Report an issue for Week ${week}:`);
    if (issue) alert(`Issue reported for Week ${week}: ${issue}`);
  };

  return (
    <div className="crop-process-container">
      <header className="crop-process-header">
        <h2>🌾 {crop} Crop Process</h2>
        <p>Follow your crop's weekly activities and mark progress.</p>
      </header>

      <div className="crop-process-grid">
        {process.map((step) => (
          <div
            key={step.week}
            className={`process-card ${completed.includes(step.week) ? "completed" : ""}`}
          >
            <h3>Week {step.week}</h3>
            <p><strong>Task:</strong> {step.task}</p>
            <p>{step.desc}</p>
            {notes[step.week] && <p className="note"><strong>Note:</strong> {notes[step.week]}</p>}

            <div className="button-row">
              <button onClick={() => toggleDone(step.week)}>
                {completed.includes(step.week) ? "✅ Done" : "Mark as Done"}
              </button>
              <button onClick={() => addNote(step.week)}>📝 Add Note</button>
              <button onClick={() => reportIssue(step.week)}>⚠️ Report Issue</button>
            </div>
          </div>
        ))}
      </div>

      <div className="process-footer">
        <Link to="/" className="btn">🏠 Home</Link>
        <Link to="/selectcrop" className="btn">🌱 Select Crop</Link>
      </div>

      {/* ✅ Reminder manager unchanged */}
      <ReminderManager crop={crop} processSteps={process} completed={completed} />
    </div>
  );
};

export default CropProcess;
