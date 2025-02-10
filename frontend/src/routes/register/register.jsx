import './register.scss';

function Register() {
  return (
    <div className="register-page">
      <div className="register-container">
        <form className="register-form" >
          <h2>Sign Up</h2>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />
          
          <button type="submit" className="signup-btn">Sign Up</button>
          
          <p className="login-text">Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
    </div>
  );
}

export default Register;