import "./userType.scss";
import { useNavigate } from "react-router-dom";

function UserType() {
  const navigate = useNavigate();

  return (
    <div className="userType">
      <div className="box" onClick={() => navigate("/find")}>
        <div className="logo">
          <img src="/find-room-icon.png" alt="Find Room" />
        </div>
        <h2>Find Your Room ?</h2>
        <button onClick={() => navigate("/find")}>Find Room</button>
      </div>
      <div className="box" onClick={() => navigate("/post")}>
        <div className="logo">
          <img src="/post-room-icon.png" alt="Post Room" />
        </div>
        <h2>Post Your Room</h2>
        <button onClick={() => navigate("/post")}>Post Room</button>
      </div>
    </div>
  );
}

export default UserType;