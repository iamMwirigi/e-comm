import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // For redirecting after login and linking
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth'; // Adjust path if needed, added doSignInWithGoogle
import { useAuth } from '../Context/authContext'; // Import useAuth to check login status
import './CSS/Login.css'

const LoginSignup = () => {
  const navigate = useNavigate();
  // const { setCurrentUser } = useAuth(); // Example if you want to set user in context directly, though onAuthStateChanged usually handles this

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // To disable button during login

  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    setError('');

    try {
      await doSignInWithEmailAndPassword(email, password);
      // Firebase's onAuthStateChanged will handle setting the currentUser in your AuthContext
      // Redirect to home page or dashboard after successful login
      navigate('/'); // Or your desired route
    } catch (err) {
      setError(err.message);
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLoggingIn) return; // Prevent multiple clicks

    setIsLoggingIn(true);
    setError('');

    try {
      await doSignInWithGoogle();
      // Navigation handled by onAuthStateChanged in AuthContext, but explicit navigate is also fine
      navigate('/'); 
    } catch (err) {
      setError(err.message);
      setIsLoggingIn(false);
    }
  };
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Log In</h1>
        <form onSubmit={handleLogin} className="loginsignup-fields">
          <input 
            type="email" 
            placeholder='Your Email Address' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          {/* Container for password input and toggle icon */}
          <div className="password-input-container">
            <input 
              type={showPassword ? 'text' : 'password'} // Toggle type based on state
              placeholder='Your Password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Password visibility toggle */}
            <span 
              className="password-toggle-icon" 
              onClick={() => setShowPassword(!showPassword)}
              role="button" // for accessibility
              tabIndex={0} // for accessibility
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword);}} // for accessibility
            >
              {showPassword ? '🙈' : '👁️'} {/* You can replace these with SVG icons too */}
            </span>
          </div>
          {error && <p className="loginsignup-error">{error}</p>}
          <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging In...' : 'Login'}
          </button>
          <button type="button" onClick={handleGoogleLogin} disabled={isLoggingIn} className="google-signin-button">
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
              <g fill="none" fillRule="evenodd">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-2.908.86-2.291 0-4.226-1.549-4.92-3.623H1.073v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M4.08 10.71a5.408 5.408 0 0 1 0-3.42V4.958H1.073a8.997 8.997 0 0 0 0 8.084L4.08 10.71z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.581-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 1.073 4.958L4.08 7.29C4.774 5.13 6.709 3.58 9 3.58z" fill="#EA4335"/>
              </g>
            </svg>
            Sign in with Google
          </button>
        </form>
        <p className="loginsignup-login">
          Don't have an account? <Link to="/signup">Sign Up here</Link>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
