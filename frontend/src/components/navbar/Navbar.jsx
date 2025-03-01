import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  if(currentUser) fetch();
  return (
    <nav>
      <div className="left">
        <a className="logo" href="/">
          <img src="/near.jpg" alt="NearbyNest Logo" />
        </a>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <Link to="/user">User</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span className="username">{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {/* {number > 0 && <div className="notification">{number}</div>} */}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
