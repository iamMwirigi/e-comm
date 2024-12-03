import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name'/>
          <input type="text" placeholder='Email Address'/>
          <input type="text" placeholder='Password'/>
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">Already have an accoount?</p>
        <span>Login here</span>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy.</p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignup
