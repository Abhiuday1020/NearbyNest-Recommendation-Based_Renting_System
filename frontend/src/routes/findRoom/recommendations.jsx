import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import "./recommendations.scss";
import React from "react";

function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations || [];

  useEffect(() => {
    console.log(recommendations);
    if (!location.state) {
      navigate("/"); 
    }
  }, [location, navigate]);

  return (
    <div className="recommendations">
      <h1>Recommended Rooms</h1>
      <div className="recommendations-list">
        {recommendations.length ? (
          recommendations.map((room, index) => (
            <div key={index} className="room-card">
              <h2>{room.Place}</h2>
              <p><strong>Rent:</strong> ₹{room.Rent}</p>
              <p><strong>Distance:</strong> {room.Distance} meters</p>
              <p><strong>Gender:</strong> {room.Gender}</p>
              <p><strong>WiFi:</strong> {room.WiFi}</p>
              <p><strong>Food:</strong> {room.Food}</p>
              <p><strong>Parking:</strong> {room.Parking}</p>
              <p><strong>Amenities:</strong> {room.Amenities}</p>
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
