import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import apiRequest from "../../lib/apiRequest"; 
import "./postRoom.scss";

function PostRoom() {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [formData, setFormData] = useState({
    place: "",
    rent: "",
    distance: "",
    gender: "Male",
    wifi: "No",
    food: "No",
    parking: "2 Wheeler",
    amenities: [],
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((amenity) => amenity !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    const formattedData = {
      ...formData,
      amenities: formData.amenities.join(", "), 
    };
  
    try {
      const res = await apiRequest.post("/postRoom/post", formattedData);
      alert("Room posted successfully!");
  
      setFormData({
        place: "",
        rent: "",
        distance: "",
        gender: "Male",
        wifi: "No",
        food: "No",
        parking: "2 Wheeler",
        amenities: [],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post-room">
      <img src="/wall2.jpg" alt="Background" className="background-img" />
      <div className={`navbar-container ${hideNavbar ? "hidden" : ""}`}>
        <Navbar />
      </div>
      <div className="post-room-content">
        <h1>Post Your Room</h1>
        <p>Fill out the details to post your room.</p>
        <form className="post-room-form" onSubmit={handleSubmit}>
          <label>Place:</label>
          <input type="text" name="place" placeholder="Enter place" value={formData.place} onChange={handleChange} required />

          <label>Rent:</label>
          <input type="number" name="rent" placeholder="Enter rent amount" value={formData.rent} onChange={handleChange} required />

          <label>Distance from College (in meters):</label>
          <input type="number" name="distance" placeholder="Enter distance" value={formData.distance} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>WiFi:</label>
          <select name="wifi" value={formData.wifi} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>Food Available:</label>
          <select name="food" value={formData.food} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>Parking Available:</label>
          <select name="parking" value={formData.parking} onChange={handleChange}>
            <option value="2 Wheeler">2 Wheeler</option>
            <option value="4 Wheeler">4 Wheeler</option>
          </select>

          <label>Amenities:</label>
          <div className="amenities">
            <label><input type="checkbox" name="amenities" value="Hospital" checked={formData.amenities.includes("Hospital")} onChange={handleChange} /> Hospital</label>
            <label><input type="checkbox" name="amenities" value="Gym" checked={formData.amenities.includes("Gym")} onChange={handleChange} /> Gym</label>
            <label><input type="checkbox" name="amenities" value="Medical Shop" checked={formData.amenities.includes("Medical Shop")} onChange={handleChange} /> Medical Shop</label>
            <label><input type="checkbox" name="amenities" value="Stationary Shop" checked={formData.amenities.includes("Stationary Shop")} onChange={handleChange} /> Stationary Shop</label>
            <label><input type="checkbox" name="amenities" value="General Purpose Store" checked={formData.amenities.includes("General Purpose Store")} onChange={handleChange} /> General Purpose Store</label>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Posting..." : "Submit"}
          </button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
      <br />
      <div className={`footer-container ${hideFooter ? "hidden" : ""}`}>
        <Footer />
      </div>
    </div>
  );
}

export default PostRoom;
