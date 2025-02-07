import "./footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} NearbyNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;