import React from 'react'
import './DescriptiveBox.css'
const DescriptiveBox = () => {
  return (
    <div  className='descriptivebox'>
        <div className='descriptivebox-navigator'>
        <div className="discriptivebox-nav-box">Description</div>
        <div className="descriptivebox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptivebox-description">
            <p>Discover our online store for stylish,
                high-quality clothing for kids, men, and women.
                We offer a curated selection of trendy, comfortable,
                and affordable apparel to suit every taste and occasion.
                Whether you're looking for cozy kids' outfits, chic women's styles,
                or classic men's fashion, we've got something for everyone. Shop with
                us for effortless style and excellent service!</p>
            
        </div>
    </div>
  )
}

export default DescriptiveBox
