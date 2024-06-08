import React from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'

const Popular = () => {
  return (
    <div>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((Item, i)=>{
            return <Item key={i} id={}/>
        })}
      </div>
    </div>
  )
}

export default Popular
