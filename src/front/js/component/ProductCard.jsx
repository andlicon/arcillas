import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../styles/productCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link className='productCard col-6 col-sm-6 col-md-3 col-lg-3 col-xl-2' to={`/product/${product.id}`}>
      <img src={product.image_url} alt={product.name} className='productCard__image' />
      <div className='productCard__content'>
        <h2 className='productCard__name'>
          {
            product.name + ' '
          }
          <span className='productCard__brand'>
            {
              product.brand
            }
          </span>
        </h2>
        <div className='productCard__description'>
          <p>
            {
              product.description
            }
          </p>
        </div>
      </div>
    </Link>
  )
};
export default ProductCard;