import React, { useEffect, useState } from "react";
import "./PersonalDashboard.css";
import "./ActivityPlanner.css";

const weeklyActivities = {
  Rice: [
    { week: 1, activity: "Land preparation and ploughing" },
    { week: 2, activity: "Sowing and irrigation" },
    { week: 3, activity: "Weed control and fertilizer" },
    { week: 4, activity: "Pest management" },
    { week: 5, activity: "Mid-season irrigation" },
    { week: 6, activity: "Harvesting" },
  ],
  Wheat: [
    { week: 1, activity: "Soil preparation and seed selection" },
    { week: 2, activity: "Sowing and irrigation" },
    { week: 3, activity: "Fertilizer and weeding" },
    { week: 4, activity: "Disease check and irrigation" },
    { week: 5, activity: "Grain filling and pest monitoring" },
    { week: 6, activity: "Harvesting and storage" },
  ],
};

const monthlyActivities = [
  { month: "January", activity: "Fertilization and irrigation maintenance" },
  { month: "February", activity: "Weed removal and pest control" },
  { month: "March", activity: "Harvest preparation" },
  { month: "April", activity: "Harvesting and storage" },
  { month: "May", activity: "Soil testing" },
  { month: "June", activity: "New crop sowing" },
];

const yearlyActivities = [
  "Soil health testing and manure preparation",
  "Crop rotation and planning for next year",
  "Water management system maintenance",
  "Fertilizer and seed stock check",
  "Pest management planning",
];

const ActivityPlanner = ({ cropDetails }) => {
  const cropType = cropDetails?.crop || "Rice";
  const weekly = weeklyActivities[cropType] || weeklyActivities["Rice"];

  // ✅ Added state for backend activities
  const [backendActivities, setBackendActivities] = useState([]);

  // ✅ Fetch user activities from backend
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ No token found. Please log in.");
          return;
        }

        const res = await fetch("http://localhost:5000/api/activities", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });

        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setBackendActivities(data);
          console.log("✅ Loaded activities from backend:", data);
        } else {
          console.warn("⚠️ Failed to fetch activities or no data found.");
        }
      } catch (error) {
        console.error("❌ Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section className="dashboard-section">
      <h3>📅 Crop Activity Planner</h3>

      <div className="planner-section">
        <h4>🗓️ Weekly Tasks</h4>
        <ul>
          {weekly.map((task, idx) => (
            <li key={idx}>
              Week {task.week}: {task.activity}
            </li>
          ))}

          {/* ✅ Display backend activities below static ones */}
          {backendActivities.length > 0 && (
            <>
              <h5 style={{ marginTop: "10px", color: "#4caf50" }}>
                ✅ Your Saved Activities
              </h5>
              {backendActivities.map((act, i) => (
                <li key={`backend-${i}`}>
                  Week {act.week || "-"}: {act.activity} —{" "}
                  <strong>{act.status || "pending"}</strong>
                  {act.notes && <> (Note: {act.notes})</>}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      <div className="planner-section">
        <h4>📆 Monthly Tasks</h4>
        <ul>
          {monthlyActivities.map((m, idx) => (
            <li key={idx}>
              <strong>{m.month}:</strong> {m.activity}
            </li>
          ))}
        </ul>
      </div>

      <div className="planner-section">
        <h4>🪴 Yearly Tasks</h4>
        <ul>
          {yearlyActivities.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ActivityPlanner;
