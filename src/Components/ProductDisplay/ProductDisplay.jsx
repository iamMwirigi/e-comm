import React, { useContext, useState } from 'react'; // Added `useContext` and `useState`
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => { 
  
  const { product } = props;
  const { addToCart } = useContext(ShopContext); 
  const [selectedSize, setSelectedSize] = useState(''); // State to track selected size

  const handleSizeSelect = (size) => {
    console.log("Attempting to select size:", size);
    setSelectedSize(size);
  };
  console.log("Current selectedSize state:", selectedSize); // Log current state on re-render

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdispaly-img-list">
          {/* Display multiple product images */}
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="main product" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          {/* Star ratings */}
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="dull star" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">Ksh {product.old_price}</div>
          <div className="productdisplay-right-price-new">Ksh {product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          A Lightweight, usually knitted, close-fitting garment
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes"> 
            <button 
              onClick={() => handleSizeSelect('S')}
              className={selectedSize === 'S' ? 'selected' : ''}
            >
              S
            </button>
            <button 
              onClick={() => handleSizeSelect('M')}
              className={selectedSize === 'M' ? 'selected' : ''}
            >
              M
            </button>
            <button 
              onClick={() => handleSizeSelect('L')}
              className={selectedSize === 'L' ? 'selected' : ''}
            >
              L
            </button>
            <button 
              onClick={() => handleSizeSelect('XL')}
              className={selectedSize === 'XL' ? 'selected' : ''}
            >
              XL
            </button>
            <button 
              onClick={() => handleSizeSelect('XXL')}
              className={selectedSize === 'XXL' ? 'selected' : ''}
            >
              XXL
            </button>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category:</span> Women, T-Shirt, Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags:</span> Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
