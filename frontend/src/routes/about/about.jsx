import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./about.scss";

function About() {
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
    <div className="about">
      <img src="/wall9.jpg" alt="Background" className="background-img" />
      <div className={`navbar-container ${hideNavbar ? "hidden" : ""}`}>
        <Navbar />
      </div>
      <div className="about-content">
        <h1>ABOUT NEARBYNEST</h1>
        <p>Finding a comfortable and affordable place to stay during college can be a daunting task, but NearbyNest simplifies    the process with a smart and personalized rental recommendation system. Tailored specifically for college students, our platform helps you discover accommodations that best match your needs—whether you prefer a shared or private room, a PG with specific amenities, or a budget-friendly apartment near your campus.

        With NearbyNest, students can filter options based on factors like rent, location, distance from college, gender preference for PGs, room size, and more. Our intelligent recommendation engine ensures that every listing is relevant, making the search faster and more efficient. We gather insights from student feedback and verified property listings to offer reliable suggestions, eliminating the hassle of endless browsing and unreliable information.

        Beyond just finding a room, NearbyNest fosters a student-friendly rental ecosystem. Users can connect with property owners, read reviews, and explore nearby amenities like restaurants, libraries, and entertainment spots. Our goal is to empower students with accurate, up-to-date information so they can make informed decisions and focus on their academic journey without the stress of house hunting.

        Whether you’re a freshman searching for your first college stay or a senior looking for an upgrade, NearbyNest is here to make your accommodation search smooth, secure, and hassle-free. Your perfect student home is just a few clicks away!
        </p>
        
      </div>
      <br />
      <div className={`footer-container ${hideFooter ? "hidden" : ""}`}>
        <Footer />
      </div>
    </div>
  );
}

export default About;
