import React, { useEffect, useState } from "react";
import "./PersonalDashboard.css";

const CropDetails = ({ cropDetails }) => {
  // ✅ Added local state to hold crop details from backend
  const [savedCrop, setSavedCrop] = useState(cropDetails);

  // ✅ Fetch crops from backend when component mounts
  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found. Please log in.");
          return;
        }

        const res = await fetch("https://farmassist-backend-2.onrender.com/api/crops", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });

        const data = await res.json();
        if (res.ok && data.length > 0) {
          // ✅ Use the most recent crop (last added)
          setSavedCrop(data[data.length - 1]);
          console.log("✅ Loaded crop from backend:", data[data.length - 1]);
        } else {
          console.warn("⚠️ No crops found or server returned error.");
        }
      } catch (error) {
        console.error("❌ Error fetching crop details:", error);
      }
    };

    fetchCropDetails();
  }, []); // runs once when page loads

  // ✅ Fallback to prop cropDetails if no backend data
  const details = savedCrop || cropDetails;

  return (
    <section className="dashboard-section crop-info">
      <h3>🌾 Selected Crop Details</h3>
      {details ? (
        <ul>
          <li><strong>State:</strong> {details.state}</li>
          <li><strong>Crop:</strong> {details.crop}</li>
          <li><strong>Season:</strong> {details.season}</li>
          <li><strong>Sowing Date:</strong> {details.sowingDate}</li>
          <li><strong>Land Area:</strong> {details.acres} acres</li>
        </ul>
      ) : (
        <p>No crop selected yet. Go to "Select Crop" to add one.</p>
      )}
    </section>
  );
};

export default CropDetails;
