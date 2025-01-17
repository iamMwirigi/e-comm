import React, { useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import { ShopContext } from '../../Context/ShopContext';

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'


const Navbar = () => {
           
      const [menu,setMenu] = useState("shop");
      const {getTotalCartItems}= useContext(ShopContext);

         

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
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt=""/></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>

      </div>
    </div>
  )
}

export default Navbar
