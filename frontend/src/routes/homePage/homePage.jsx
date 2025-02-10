import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './homePage.scss';

function HomePage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleExploreClick = () => {
    navigate('/list'); // Redirect to the "/list" route
  };

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <br />
          <br></br>
          <br></br>
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            NearbyNest is a student-friendly renting platform designed to help college students
            find rooms, flats, and PG accommodations near their campus. With a smart recommendation
            system based on preferences like budget, location, and amenities, NearbyNest simplifies
            house-hunting, making it quick and hassle-free. Whether you're looking for a shared
            apartment, a private room, or a budget-friendly stay, we connect you with verified listings
            to ensure a smooth and secure renting experience. 🏠✨
          </p>

          <h2>Why Choose NearbyNest?</h2>
          <p>
            
          </p>

          <button className="exploreBtn" onClick={handleExploreClick}>
            Available Rooms
          </button>
          <br></br>
        </div>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="Real Estate" />
      </div>
    </div>
  );
}

export default HomePage;
