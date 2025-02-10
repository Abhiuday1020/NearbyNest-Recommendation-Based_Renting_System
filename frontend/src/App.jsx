import ListPage from "./routes/listPage/listPage";
import HomePage from "./routes/homePage/homePage";
import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/SinglePage";
import UserType from "./routes/userType/userType";
import PostRoom from "./routes/postRoom/postRoom";
import FindRoom from "./routes/findRoom/findRoom";
import LoginPage from "./routes/loginPage/login";
import SignupPage from "./routes/signupPage/signup";
import Register from "./routes/register/register";
import About from "./routes/about/about";
import Contact from "./routes/contact/contact";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>
        },
        {
          path:"/:id",
          element:<SinglePage/>
        },
        {
          path:"/user",
          element:<UserType/>
        },
        {
          path:"/post",
          element:<PostRoom/>
        },
        {
          path:"/find",
          element:<FindRoom/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/about",
          element:<About/>
        },
        {
          path:"/contact",
          element:<Contact/>
        },
      ]
    },
    {
      path:"/login",
      element:<LoginPage/>
    },
    {
      path:"/signup",
      element:<SignupPage/>
    }
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;