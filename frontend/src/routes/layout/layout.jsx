import './layout.scss'
import Navbar from "../../components/navbar/Navbar"
import Footer from '../../components/footer/Footer';
import { Outlet } from 'react-router-dom';
function Layout(){
  return (
    
    <div className="layout">
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="content">
        <Outlet/>
      </div>
      <div className="footer">
        <Footer/>
      </div>
    </div>
    
  );
}
export default Layout;