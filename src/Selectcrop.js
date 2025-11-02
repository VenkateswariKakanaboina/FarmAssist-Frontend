import React, { useState } from 'react';
import './Selectcrop.css';
import { saveCropProcess } from "./CropProcess";
import WeatherPanel from "./WeatherPanel"; // ✅ Weather Panel added

const cropData = {
  "Andhra Pradesh": [
    { crop: "Rice", season: "Kharif (Jun-Sep)" },
    { crop: "Maize", season: "Rabi (Oct-Feb)" },
    { crop: "Chili", season: "Zaid (Mar-Jun)" }
  ],
  "Arunachal Pradesh": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Maize", season: "Rabi (Oct-Feb)" },
    { crop: "Millet", season: "Zaid (Mar-Jun)" }
  ],
  "Assam": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Tea", season: "Rabi (Oct-Mar)" },
    { crop: "Mustard", season: "Rabi (Oct-Feb)" }
  ],
  "Bihar": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Wheat", season: "Rabi (Nov-Apr)" },
    { crop: "Maize", season: "Zaid (Mar-Jun)" }
  ],
  "Chhattisgarh": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Maize", season: "Rabi (Oct-Feb)" },
    { crop: "Pulses", season: "Zaid (Mar-Jun)" }
  ],
  "Goa": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Cashew", season: "Rabi (Oct-Feb)" },
    { crop: "Coconut", season: "All year" }
  ],
  "Gujarat": [
    { crop: "Cotton", season: "Kharif (Jun-Oct)" },
    { crop: "Groundnut", season: "Kharif (Jun-Sep)" },
    { crop: "Wheat", season: "Rabi (Nov-Apr)" }
  ],
  "Haryana": [
    { crop: "Wheat", season: "Rabi (Nov-Apr)" },
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Sugarcane", season: "Rabi (Oct-Mar)" }
  ],
  "Himachal Pradesh": [
    { crop: "Wheat", season: "Rabi (Nov-Apr)" },
    { crop: "Maize", season: "Kharif (Jun-Oct)" },
    { crop: "Apple", season: "All year" }
  ],
  "Jharkhand": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Maize", season: "Rabi (Oct-Feb)" },
    { crop: "Pulses", season: "Zaid (Mar-Jun)" }
  ],
  "Karnataka": [
    { crop: "Rice", season: "Kharif (Jun-Sep)" },
    { crop: "Maize", season: "Rabi (Oct-Feb)" },
    { crop: "Sugarcane", season: "Rabi (Oct-Mar)" }
  ],
  "Kerala": [
    { crop: "Rice", season: "Kharif (Jun-Sep)" },
    { crop: "Coconut", season: "All year" },
    { crop: "Banana", season: "All year" }
  ],
  "Madhya Pradesh": [
    { crop: "Soybean", season: "Kharif (Jun-Sep)" },
    { crop: "Wheat", season: "Rabi (Nov-Apr)" },
    { crop: "Pulses", season: "Zaid (Mar-Jun)" }
  ],
  "Maharashtra": [
    { crop: "Soybean", season: "Kharif (Jun-Sep)" },
    { crop: "Sugarcane", season: "Rabi (Oct-Mar)" },
    { crop: "Cotton", season: "Kharif (Jun-Oct)" }
  ],
  "Manipur": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Maize", season: "Rabi (Oct-Feb)" },
    { crop: "Potato", season: "Rabi (Oct-Feb)" }
  ],
  "Meghalaya": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Potato", season: "Rabi (Oct-Feb)" },
    { crop: "Orange", season: "All year" }
  ],
  "Mizoram": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Maize", season: "Rabi (Oct-Feb)" },
    { crop: "Ginger", season: "All year" }
  ],
  "Nagaland": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Maize", season: "Rabi (Oct-Feb)" },
    { crop: "Millet", season: "Zaid (Mar-Jun)" }
  ],
  "Odisha": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Pulses", season: "Rabi (Oct-Feb)" },
    { crop: "Maize", season: "Zaid (Mar-Jun)" }
  ],
  "Punjab": [
    { crop: "Wheat", season: "Rabi (Nov-Apr)" },
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Maize", season: "Zaid (Mar-Jun)" }
  ],
  "Rajasthan": [
    { crop: "Wheat", season: "Rabi (Nov-Apr)" },
    { crop: "Bajra", season: "Kharif (Jun-Oct)" },
    { crop: "Mustard", season: "Rabi (Oct-Feb)" }
  ],
  "Tamil Nadu": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Sugarcane", season: "Rabi (Oct-Mar)" },
    { crop: "Banana", season: "All year" }
  ],
  "Telangana": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Maize", season: "Rabi (Oct-Feb)" },
    { crop: "Chili", season: "Zaid (Mar-Jun)" }
  ],
  "Uttar Pradesh": [
    { crop: "Wheat", season: "Rabi (Nov-Apr)" },
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Sugarcane", season: "Rabi (Oct-Mar)" }
  ],
  "West Bengal": [
    { crop: "Rice", season: "Kharif (Jun-Oct)" },
    { crop: "Jute", season: "Kharif (Jun-Oct)" },
    { crop: "Potato", season: "Rabi (Oct-Feb)" }
  ]
};

const states = Object.keys(cropData);

const SelectCrop = () => {
  const [formData, setFormData] = useState({
    state: '',
    crop: '',
    season: '',
    sowingDate: '',
    acres: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData(prev => ({
      ...prev,
      state,
      crop: '',
      season: ''
    }));
  };

  const handleCropChange = (e) => {
    const selectedCrop = e.target.value;
    const cropObj = cropData[formData.state]?.find(c => c.crop === selectedCrop);
    setFormData(prev => ({
      ...prev,
      crop: selectedCrop,
      season: cropObj ? cropObj.season : ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Crop Details:", formData);
    saveCropProcess(formData.crop, formData.state, formData.season);
    alert(`✅ Crop process for ${formData.crop} added to your timeline!`);
  };

  const availableCrops = formData.state ? cropData[formData.state] : [];

  return (
    <div className="selectcrop-container">
      <h2>Select Crop Details</h2>
      <form className="selectcrop-form" onSubmit={handleSubmit}>
        <label htmlFor="state">State:</label>
        <select name="state" id="state" value={formData.state} onChange={handleStateChange} required>
          <option value="">-- Select State --</option>
          {states.map((state, idx) => (
            <option key={idx} value={state}>{state}</option>
          ))}
        </select>

        <label htmlFor="crop">Crop:</label>
        <select name="crop" id="crop" value={formData.crop} onChange={handleCropChange} required>
          <option value="">-- Select Crop --</option>
          {availableCrops.map((c, idx) => (
            <option key={idx} value={c.crop}>{c.crop}</option>
          ))}
        </select>

        <label htmlFor="season">Season:</label>
        <input type="text" name="season" id="season" value={formData.season} readOnly />

        <label htmlFor="sowingDate">Expected Sowing Date:</label>
        <input
          type="date"
          name="sowingDate"
          id="sowingDate"
          value={formData.sowingDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="acres">Land Area (in acres):</label>
        <input
          type="number"
          name="acres"
          id="acres"
          value={formData.acres}
          onChange={handleChange}
          placeholder="e.g., 2.5"
          required
        />

        <button type="submit">Add Crop to Dashboard</button>
      </form>

      {/* ✅ Weather panel shown when a state is selected */}
      {formData.state && <WeatherPanel location={formData.state} />}
    </div>
  );
};

export default SelectCrop;
