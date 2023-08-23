import React from 'react';
import { Link } from "react-router-dom";

const ProductList = () => {
  return (
    <div className='container'>
      <h2>Productos</h2>
      <Link to='create'>Añadir producto</Link>
    </div>
  )
};
export default ProductList;