import React, { useState } from 'react';
import SelectCrop from './Selectcrop'; // Make sure you have this component
// Home Page Component
const Home = ({ navigate }) => (
  <div className="home-content">
  </div>
);
// Selected Crop Details Component
const SelectedCropDetails = ({ cropDetails }) => (
  <div className="selected-crop-details-section">
    <h3>Selected Crop Details</h3>
    <p><strong>State:</strong> {cropDetails.state || '-'}</p>
    <p><strong>Crop:</strong> {cropDetails.crop || '-'}</p>
    <p><strong>Season:</strong> {cropDetails.season || '-'}</p>
    <p><strong>Sowing Date:</strong> {cropDetails.sowingDate || '-'}</p>
    <p><strong>Land Area:</strong> {cropDetails.acres ? `${cropDetails.acres} acres` : '-'}</p>
  </div>
);

// Main Timeline Component
function Timeline() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cropDetails, setCropDetails] = useState({
    state: '',
    crop: '',
    season: '',
    sowingDate: '',
    acres: ''
  });

  const navigateHome = () => {
    setCurrentPage('home');
    setCropDetails({
      state: '',
      crop: '',
      season: '',
      sowingDate: '',
      acres: ''
    }); // reset crop details when going home
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>AgriDashboard</h1>
        <nav>
          <button onClick={navigateHome}>Home</button>
          <button onClick={() => setCurrentPage('cropSelection')}>Crop Selection</button>
          <button onClick={() => setCurrentPage('selectedCrop')}>Selected Crop Details</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {currentPage === 'home' && <Home navigate={setCurrentPage} />}
        {currentPage === 'cropSelection' && (
          <SelectCrop setCropDetails={setCropDetails} navigate={setCurrentPage} />
        )}
        {currentPage === 'selectedCrop' && <SelectedCropDetails cropDetails={cropDetails} />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        &copy; 2025 AgriDashboard. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Timeline;
