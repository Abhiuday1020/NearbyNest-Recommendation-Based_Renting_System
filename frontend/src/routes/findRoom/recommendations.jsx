import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import "./recommendations.scss";
import React from "react";

function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations || [];

  // Redirect user if no recommendations exist (user directly visits this page)
  useEffect(() => {
    console.log(recommendations);
    if (!location.state) {
      navigate("/"); // Redirect back to the form page
    }
  }, [location, navigate]);

  return (
    <div className="recommendations">
      {/* Background Wallpaper */}
      {/*<img className="backgroundImage" src="/wall3.jpg" alt="Background Wallpaper" />*/}

      <h1>Recommended Rooms</h1>
      <div className="recommendations-list">
        {recommendations.length ? (
          recommendations.map((room, index) => (
            <div key={index} className="room-card">
              <h2>{room.place}</h2>
              <p><strong>Rent:</strong> ₹{room.rent}</p>
              <p><strong>Distance:</strong> {room.distance} meters</p>
              <p><strong>Gender:</strong> {room.gender}</p>
              <p><strong>WiFi:</strong> {room.wifi}</p>
              <p><strong>Food:</strong> {room.food}</p>
              <p><strong>Parking:</strong> {room.parking}</p>
            </div>
          ))
        ) : (
          <div className="no-data">
            <p>No recommendations found.</p>
            <button onClick={() => navigate("/")} className="back-btn">
              Go Back
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Recommendations;
