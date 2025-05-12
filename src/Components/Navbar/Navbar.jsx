import React, { useState, useContext, useEffect } from 'react'; // Import useEffect
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation
import './Navbar.css';
import { ShopContext } from '../../Context/ShopContext';
import { useAuth } from '../../Context/authContext'; // Import the useAuth hook
import { doSignOut } from '../../firebase/auth'; // Import your doSignOut function

import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';


const Navbar = () => {
           
      const [menu,setMenu] = useState("shop");
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility
      const {getTotalCartItems, clearCart}= useContext(ShopContext); // Destructure clearCart
      const { currentUser } = useAuth(); // Get the current user from the authentication context
      const location = useLocation(); // Get the current location object
      const navigate = useNavigate(); // Initialize useNavigate

      const handleLogout = async () => {
        try {
          clearCart(); // Clear the cart state on logout
          await doSignOut();
          navigate('/login'); // Redirect to login page after successful logout
        } catch (error) {
          console.error("Logout failed:", error);
          // Optionally, display an error message to the user
        }
      };

      const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      };

      // Update menu state based on current pathname
      useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/') {
          setMenu("shop");
        } else if (currentPath === '/mens') {
          setMenu("mens");
        } else if (currentPath === '/womens') {
          setMenu("womens");
        } else if (currentPath === '/kids') {
          setMenu("kids");
        } else {
          setMenu(""); // Set to empty or a non-matching value for other pages
        }
        // Close mobile menu on route change
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }, [location.pathname]); // Re-run effect when pathname changes


  return (
    <div className='navbar'>
      <div className='navbar_logo'>
      <img src={logo} alt="" />
      <p>THOKO</p>{/* Consider adding alt text to the logo image */}
      </div>
      {/* Hamburger Icon for mobile - will be hidden on large screens via CSS */}
      <div className="nav-hamburger" onClick={toggleMobileMenu}>
        {/* Using simple text icons for now. Replace with SVG or font icon later */}
        {isMobileMenuOpen ? <span>&#x2715;</span> : <span>&#9776;</span>} 
      </div>

      {/* Apply a class to show/hide menu on mobile based on state */}
      <ul className={`nav-menu ${isMobileMenuOpen ? 'nav-menu-open' : ''}`}>
        <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{ textDecoration: 'none' }} to="/womens">Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart"> 
      {/* Conditionally render based on user authentication status */}
        {currentUser ? ( 
            <button onClick={handleLogout}>Logout</button> 
        ) : ( // If no user is logged in (currentUser is null)
          <Link to='/login'><button type="button">Login</button></Link> // Display the login button, added type="button"
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
