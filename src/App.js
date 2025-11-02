// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Services from "./Services";
import Knowledge from "./Knowledge";
import SelectCrop from "./Selectcrop"; // ✅ must match default export in Track.js
import Login from "./Login";
import Timeline from "./Timeline";
import PersonalDashboard from "./PersonalDashboard";
import "./App.css";
import ReminderManager from "./ReminderManager";
import ActivityPlanner from "./ActivityPlanner";
import ExpenseTracker from "./ExpenseTracker";
import CropProcess from "./CropProcess"
import Signup from "./Signup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/selectcrop" element={<SelectCrop />} />
        <Route path="/track" element={<Timeline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PersonalDashboard />} />
        <Route path="/remainder" element={<ReminderManager />} />
        <Route path="/activity" element={<ActivityPlanner />} />
        <Route path="/crop" element={<CropProcess />} />
        <Route path="/expenses" element={<ExpenseTracker />} />

      </Routes>
    </Router>
  );
}
export default App;
