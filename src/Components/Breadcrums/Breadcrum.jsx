import React from 'react';
import './Breadcrum.css';
import { Link } from 'react-router-dom'; // Import Link

import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
    const { product } = props;

    // Check if product is defined
    if (!product) {
        return <div className='breadcrum'></div>; // or any other placeholder you prefer
    }

    return (
        <div className='breadcrum'>
<Link to="/">HOME</Link> <img src={arrow_icon} alt="arrow" /> 
            <Link to="/">SHOP</Link> <img src={arrow_icon} alt="arrow" /> 
            {/* Assuming your category routes are like /mens, /womens etc. */}
            <Link to={`/${product.category.toLowerCase()}`}>{product.category}</Link> 
            <img src={arrow_icon} alt="arrow" /> {product.name}
        </div>
    );
};

export default Breadcrum;
