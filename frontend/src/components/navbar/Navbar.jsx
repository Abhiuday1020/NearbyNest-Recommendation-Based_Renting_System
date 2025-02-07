import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="left">
        <a className="logo">
          <span>NearbyNest</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <Link to="/user">User</Link>
      </div>
      <div className="right">
        <Link to="/login">Sign In</Link>
        <Link to="/signup" className="register">Sign Up</Link>
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
