import "./card.scss";
import { Link } from "react-router-dom";

function Card({ item }) {
  if (!item) {
    console.log("Invalid room data:", item);
    return <p>Invalid room data</p>;
  }


  return (
    <div className="card">
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.place || "Unknown Place"}</Link> 
        </h2>
        <p className="address">
          <img src="/pin.png" alt="Location" />
          <span>Distance: {item.distance || "N/A"} km</span> 
        </p>
        <p className="price">₹ {item.rent || "N/A"}</p> 
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="Bed" />
              <span>{item.bedroom || 0} Bedroom(s)</span> 
            </div>
            <div className="feature">
              <img src="/bath.png" alt="Bath" />
              <span>{item.bathroom || 0} Bathroom(s)</span> 
            </div>
          </div>
          <div className="amenities">
            <p>Amenities: {item.amenities || "None"}</p> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
