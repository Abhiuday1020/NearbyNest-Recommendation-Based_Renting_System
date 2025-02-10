import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./contact.scss";

function Contact() {
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
    <div className="contact">
      <img src="/wall12.jpg" alt="Background" className="background-img" />
      <div className={`navbar-container ${hideNavbar ? "hidden" : ""}`}>
        <Navbar />
      </div>
      <div className="contact-content">
        <h1>ABOUT NEARBYNEST</h1>
        <p>
        </p>
        
      </div>
      <br />
      <div className={`footer-container ${hideFooter ? "hidden" : ""}`}>
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
