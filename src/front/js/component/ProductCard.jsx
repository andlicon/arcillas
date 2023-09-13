import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../styles/productCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4' to={`/product/${product.id}`}>
      <div className="productCard rounded">
        <img src={product.image_url} alt={product.name} className='productCard__image rounded' />
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
      </div>
    </Link>
  )
};
export default ProductCard;