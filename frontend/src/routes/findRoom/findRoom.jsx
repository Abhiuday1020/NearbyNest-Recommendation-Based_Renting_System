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
    Place: "",
    Rent: "",
    Distance: "",
    Gender: "Male",
    WiFi: "No",
    Food: "No",
    Amenities: [],
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
        Amenities: checked
          ? [...prevData.Amenities, value]
          : prevData.Amenities.filter((Amenity) => Amenity !== value),
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
      Amenities: formData.Amenities.join(", "), 
    };
    console.log("Data being sent:", formattedData);
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
          <input type="text" name="Place" value={formData.Place} onChange={handleChange} placeholder="Enter place" />

          <label>Rent:</label>
          <input type="number" name="Rent" value={formData.Rent} onChange={handleChange} placeholder="Enter rent amount" />

          <label>Distance from College (in meters):</label>
          <input type="number" name="Distance" value={formData.Distance} onChange={handleChange} placeholder="Enter distance" />

          <label>Gender:</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
          </select>

          <label>WiFi:</label>
          <select name="WiFi" value={formData.WiFi} onChange={handleChange}>
            <option>No</option>
            <option>Yes</option>
          </select>

          <label>Food Available:</label>
          <select name="Food" value={formData.Food} onChange={handleChange}>
            <option>No</option>
            <option>Yes</option>
          </select>

          <label>Amenities:</label>
          <div className="amenities">
            <label>
            Hospital
              <input type="checkbox" value="Hospital" checked={formData.Amenities.includes("Hospital")} onChange={handleChange} />
              
            </label>
            <label>
            Gym
              <input type="checkbox" value="Gym" checked={formData.Amenities.includes("Gym")} onChange={handleChange} />
              
            </label>
            <label>
            Medical Shop
              <input type="checkbox" value="Medical Shop" checked={formData.Amenities.includes("Medical Shop")} onChange={handleChange} />
              
            </label>
            <label>
            Stationary Shop
              <input type="checkbox" value="Stationary Shop" checked={formData.Amenities.includes("Stationary Shop")} onChange={handleChange} />
              
            </label>
            <label>
            General Purpose Store
              <input type="checkbox" value="General Purpose Store" checked={formData.Amenities.includes("General Purpose Store")} onChange={handleChange} />
              
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
