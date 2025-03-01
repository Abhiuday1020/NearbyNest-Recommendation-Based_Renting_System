import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import apiRequest from "../../lib/apiRequest"; 
import "./postRoom.scss";

function PostRoom() {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [formData, setFormData] = useState({
    Place: "",
    Rent: "",
    Distance: "",
    Gender: "Male",
    WiFi: "No",
    Food: "No",
    Parking: "2 Wheeler",
    Amenities: [],
    Bedroom: "",
    Bathroom: ""
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        Amenities: checked
          ? [...prev.Amenities, value]
          : prev.Amenities.filter((Amenity) => Amenity !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    const formattedData = {
      ...formData,
      Rent: parseInt(formData.Rent, 10),
      Distance: parseInt(formData.Distance, 10),
      Bedroom: parseInt(formData.Bedroom, 10),
      Bathroom: parseInt(formData.Bathroom, 10),
      Amenities: formData.Amenities.join(", "), 
    };
  
    try {
      const res = await apiRequest.post("/postRoom/post", formattedData);
      alert("Room posted successfully!");
      setFormData({
        Place: "",
        Rent: "",
        Distance: "",
        Gender: "Male",
        WiFi: "No",
        Food: "No",
        Parking: "2 Wheeler",
        Amenities: [],
        Bedroom: "",
        Bathroom: ""
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
          <input type="text" name="Place" placeholder="Enter place" value={formData.Place} onChange={handleChange} required />

          <label>Rent:</label>
          <input type="number" name="Rent" placeholder="Enter rent amount" value={formData.Rent} onChange={handleChange} required />

          <label>Distance from College (in meters):</label>
          <input type="number" name="Distance" placeholder="Enter distance" value={formData.Distance} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>WiFi:</label>
          <select name="WiFi" value={formData.WiFi} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>Food Available:</label>
          <select name="Food" value={formData.Food} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>Parking Available:</label>
          <select name="Parking" value={formData.Parking} onChange={handleChange}>
            <option value="2 Wheeler">2 Wheeler</option>
            <option value="4 Wheeler">4 Wheeler</option>
          </select>

          <label>Number of Bedrooms:</label>
          <input type="number" name="Bedroom" placeholder="Enter number of bedrooms" value={formData.Bedroom} onChange={handleChange} required />

          <label>Number of Bathrooms:</label>
          <input type="number" name="Bathroom" placeholder="Enter number of bathrooms" value={formData.Bathroom} onChange={handleChange} required />

          <label>Amenities:</label>
          <div className="amenities">
            <label><input type="checkbox" name="Amenities" value="Hospital" checked={formData.Amenities.includes("Hospital")} onChange={handleChange} /> Hospital</label>
            <label><input type="checkbox" name="Amenities" value="Gym" checked={formData.Amenities.includes("Gym")} onChange={handleChange} /> Gym</label>
            <label><input type="checkbox" name="Amenities" value="Medical Shop" checked={formData.Amenities.includes("Medical Shop")} onChange={handleChange} /> Medical Shop</label>
            <label><input type="checkbox" name="Amenities" value="Stationary Shop" checked={formData.Amenities.includes("Stationary Shop")} onChange={handleChange} /> Stationary Shop</label>
            <label><input type="checkbox" name="Amenities" value="General Purpose Store" checked={formData.Amenities.includes("General Purpose Store")} onChange={handleChange} /> General Purpose Store</label>
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
