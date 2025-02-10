import "./userType.scss";
import { useNavigate } from "react-router-dom";

function UserType() {
  const navigate = useNavigate();

  return (
  
    <div className="userType">
      {/* Background Wallpaper */}
      <img
        className="backgroundImage"
        src="/wall3.jpg"
        alt="Background Wallpaper"
      />
      <div className="box">
        <div className="logo">
          <img src="/userlogo.jpg" alt="Find Room" />
        </div>
        <h2>Find Your Room</h2>
        <button onClick={() => navigate("/find")}>Find Room</button>
      </div>
      <div className="box">
        <div className="logo">
          <img src="/renterlogo.jpg" alt="Post Room" />
        </div>
        <h2>List Your Room</h2>
        <button onClick={() => navigate("/post")}>Post Room</button>
      </div>
    </div>
  );
}

export default UserType;
