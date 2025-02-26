import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./recommendations.scss";
import React from "react";

function Recommendations() {
  const location = useLocation();
  const recommendations = location.state?.recommendations || [];

  return (
    <div className="recommendations">
      <Navbar />
      <h1>Recommended Rooms</h1>
      <div className="recommendations-list">
        {recommendations.length ? (
          recommendations.map((room, index) => (
            <div key={index} className="room-card">
              <h2>{room.place}</h2>
              <p>Rent: ₹{room.rent}</p>
              <p>Distance: {room.distance} meters</p>
              <p>Gender: {room.gender}</p>
              <p>WiFi: {room.wifi}</p>
              <p>Food: {room.food}</p>
              <p>Parking: {room.parking}</p>
            </div>
          ))
        ) : (
          <p>No recommendations found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Recommendations;
