import React, { useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';
import { ShopContext } from '../../Context/ShopContext';
import { useAuth } from '../../Context/authContext'; // Import the useAuth hook
import { doSignOut } from '../../firebase/auth'; // Import your doSignOut function

import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';


const Navbar = () => {
           
      const [menu,setMenu] = useState("shop");
      const {getTotalCartItems}= useContext(ShopContext);
      const { currentUser } = useAuth(); // Get the current user from the authentication context
      const navigate = useNavigate(); // Initialize useNavigate

      const handleLogout = async () => {
        try {
          await doSignOut();
          navigate('/login'); // Redirect to login page after successful logout
        } catch (error) {
          console.error("Logout failed:", error);
          // Optionally, display an error message to the user
        }
      };


  return (
    <div className='navbar'>
      <div className='navbar_logo'>
      <img src={logo} alt="" />
      <p>THOKO</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none' }} to='/'>Shop{menu==="shop"?<hr/>:<></>}</Link></li>
        <li onClick={()=>{setMenu("mens")}}><Link style={{ textDecoration: 'none' }} to='/mens'>Men{menu==="mens"?<hr/>:<></>}</Link></li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{ textDecoration: 'none' }} to="/womens">Women{menu==="womens"?<hr/>:<></>}</Link></li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids{menu==="kids"?<hr/>:<></>}</Link></li>
      </ul>
      <div className="nav-login-cart"> 
      {/* Conditionally render based on user authentication status */}
        {currentUser ? ( 
            <button onClick={handleLogout}>Logout</button> 
        ) : ( // If no user is logged in (currentUser is null)
          <Link to='/login'><button>Login</button></Link> // Display the login button
        )}
           <div className="nav-cart-icon-container"> {/* Wrapper for icon and count */}
          <Link to='/cart'><img src={cart_icon} alt="cart icon"/></Link> 
          <div className="nav-cart-count">{getTotalCartItems()}</div> 
        </div>
      </div>
    </div>
  )
}

export default Navbar
