import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  // const data = useLoaderData();

  const { updateUser, currentUser } = useContext(AuthContext);

  // const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="page">
      
        <div className="user">
          <div className="title">
            <h1>Profile</h1>
            
          </div>
          <div className="info">
            <span>
              
              <img src={currentUser?.avatar || "noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser?.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.email}</b>
            </span>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div> 

        <div className="vertical">

          <div className="list">
            <div className="title">
              <h1>My List</h1>
              <Link to="/add">
                <button>Create New Post</button>
              </Link>
            </div>
            
            {/* Uncomment and use this when `data` is available */}
            {/* <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) => <List posts={postResponse.data.userPosts} />}
              </Await>
            </Suspense> */}

            <div className="title">
              <h1>Saved List</h1>
            </div>

            {/* Uncomment and use this when `data` is available */}
            {/* <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) => <List posts={postResponse.data.savedPosts} />}
              </Await>
            </Suspense> */}
        
          </div>

          <div className="chatContainer">
            <div className="wrapper">
              {/* Uncomment and use this when `data` is available */}
              {/* <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.chatResponse}
                  errorElement={<p>Error loading chats!</p>}
                >
                  {(chatResponse) => <Chat chats={chatResponse.data}/>}
                </Await>
              </Suspense> */}
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}

export default ProfilePage;
