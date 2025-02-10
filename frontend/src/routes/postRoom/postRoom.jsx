import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./postRoom.scss";

function PostRoom() {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
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

  return (
    <div className="post-room">
      <img src="/wall2.jpg" alt="Background" className="background-img" />
      <div className={`navbar-container ${hideNavbar ? "hidden" : ""}`}>
        <Navbar />
      </div>
      <div className="post-room-content">
        <h1>Post Your Room</h1>
        <p>Fill out the details to post your room.</p>
        <form className="post-room-form">
          <label>Place:</label>
          <input type="text" placeholder="Enter place" />
          
          <label>Rent:</label>
          <input type="number" placeholder="Enter rent amount" />
          
          <label>Distance from College (in meters):</label>
          <input type="number" placeholder="Enter distance" />
          
          <label>Gender:</label>
          <select>
            <option>Male</option>
            <option>Female</option>
          </select>
          
          <label>WiFi:</label>
          <select>
            <option>Yes</option>
            <option>No</option>
          </select>
          
          <label>Food Available:</label>
          <select>
            <option>Yes</option>
            <option>No</option>
          </select>
          
          <label>Parking Available:</label>
          <select>
            <option>2 Wheeler</option>
            <option>4 Wheeler</option>
          </select>
          
          <label>Amenities:</label>
          <div className="amenities">
            <label><input type="checkbox" /> Hospital</label>
            <label><input type="checkbox" /> Gym</label>
            <label><input type="checkbox" /> Medical Shop</label>
            <label><input type="checkbox" /> Stationary Shop</label>
            <label><input type="checkbox" /> General Purpose Store</label>
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

export default PostRoom;
