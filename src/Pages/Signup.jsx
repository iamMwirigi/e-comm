import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // For redirecting and linking
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth'; // Adjust path, added doSignInWithGoogle
import './CSS/Signup.css'; // We can reuse or adapt styles

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isSigningUp) return;

    setIsSigningUp(true);
    setError('');

    try {
      // You can add name to Firestore after user creation if needed
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      console.log("User created:", userCredential.user);
      // Optionally send email verification here if desired
      // await doSendEmailVerification();
      // alert("Verification email sent! Please check your inbox.");

      // Navigate to login page or directly to home after successful signup
      navigate('/'); // Or navigate('/') if you want to log them in automatically
                         // (Firebase onAuthStateChanged will handle this)
    } catch (err) {
      setError(err.message);
      setIsSigningUp(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (isSigningUp) return; // Prevent multiple clicks

    setIsSigningUp(true);
    setError('');

    try {
      await doSignInWithGoogle();
      // Firebase's onAuthStateChanged will handle setting the currentUser
      // and navigation to '/' is usually handled by that or explicitly here
      navigate('/'); 
    } catch (err) {
      setError(err.message);
      setIsSigningUp(false);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup} className="loginsignup-fields">
          <input
            type="text"
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6" // Good practice to enforce minimum password length
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword);}}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          {error && <p className="loginsignup-error">{error}</p>}
          <button type="submit" disabled={isSigningUp}>
            {isSigningUp ? 'Signing Up...' : 'Sign Up'}
          </button>
          <button type="button" onClick={handleGoogleSignup} disabled={isSigningUp} className="google-signin-button">
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
              <g fill="none" fillRule="evenodd">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-2.908.86-2.291 0-4.226-1.549-4.92-3.623H1.073v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M4.08 10.71a5.408 5.408 0 0 1 0-3.42V4.958H1.073a8.997 8.997 0 0 0 0 8.084L4.08 10.71z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.581-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 1.073 4.958L4.08 7.29C4.774 5.13 6.709 3.58 9 3.58z" fill="#EA4335"/>
              </g>
            </svg>
            Sign up with Google
          </button>
        </form>
        <p className="loginsignup-login">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='terms' id='terms-checkbox' required />
          <label htmlFor="terms-checkbox" style={{marginLeft: '5px'}}>By continuing, I agree to the terms of use & privacy policy.</label>
        </div>
      </div>
    </div>
  );
};

export default Signup;
