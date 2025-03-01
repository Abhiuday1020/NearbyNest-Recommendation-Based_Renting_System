import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./findRoom.scss";
import axios from "axios";

function FindRoom() {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [formData, setFormData] = useState({
    place: "",
    rent: "",
    distance: "",
    gender: "Male",
    wifi: "Yes",
    food: "Yes",
    parking: "2 Wheeler",
    amenities: [],
  });

  const navigate = useNavigate();
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setHideNavbar(true);
        setHideFooter(false);
      } else {
        setHideNavbar(false);
        setHideFooter(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        amenities: checked
          ? [...prevData.amenities, value]
          : prevData.amenities.filter((amenity) => amenity !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      amenities: formData.amenities.join(", "), 
    };

    try {
      const response = await axios.post("http://localhost:5000/recommendations", formattedData);
      navigate("/recommendations", { state: { recommendations: response.data } });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div className="find-room">
      <img src="/wall8.jpg" alt="Background" className="background-img" />
      <div className={`navbar-container ${hideNavbar ? "hidden" : ""}`}>
        <Navbar />
      </div>
      <div className="find-room-content">
        <h1>Find Your Room</h1>
        <p>Fill out the details to post your room.</p>
        <form className="find-room-form" onSubmit={handleSubmit}>
          <label>Place:</label>
          <input type="text" name="place" value={formData.place} onChange={handleChange} placeholder="Enter place" />

          <label>Rent:</label>
          <input type="number" name="rent" value={formData.rent} onChange={handleChange} placeholder="Enter rent amount" />

          <label>Distance from College (in meters):</label>
          <input type="number" name="distance" value={formData.distance} onChange={handleChange} placeholder="Enter distance" />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
          </select>

          <label>WiFi:</label>
          <select name="wifi" value={formData.wifi} onChange={handleChange}>
            <option>Yes</option>
            <option>No</option>
          </select>

          <label>Food Available:</label>
          <select name="food" value={formData.food} onChange={handleChange}>
            <option>Yes</option>
            <option>No</option>
          </select>

          <label>Parking Available:</label>
          <select name="parking" value={formData.parking} onChange={handleChange}>
            <option>2 Wheeler</option>
            <option>4 Wheeler</option>
          </select>

          <label>Amenities:</label>
          <div className="amenities">
            <label>
            Hospital
              <input type="checkbox" value="Hospital" checked={formData.amenities.includes("Hospital")} onChange={handleChange} />
              
            </label>
            <label>
            Gym
              <input type="checkbox" value="Gym" checked={formData.amenities.includes("Gym")} onChange={handleChange} />
              
            </label>
            <label>
            Medical Shop
              <input type="checkbox" value="Medical Shop" checked={formData.amenities.includes("Medical Shop")} onChange={handleChange} />
              
            </label>
            <label>
            Stationary Shop
              <input type="checkbox" value="Stationary Shop" checked={formData.amenities.includes("Stationary Shop")} onChange={handleChange} />
              
            </label>
            <label>
            General Purpose Store
              <input type="checkbox" value="General Purpose Store" checked={formData.amenities.includes("General Purpose Store")} onChange={handleChange} />
              
            </label>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
      <br />
      <div className={`footer-container ${hideFooter ? "hidden" : ""}`}>
        <Footer />
      </div>
    </div>
  );
}

export default FindRoom;
