import React, { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from '../store/appContext.js';
import ItemPagination from '../component/ItemPagination.jsx';

const ProductList = () => {
  const { actions } = useContext(Context);
  const { getProductPage } = actions;

  useEffect(() => {
    getProductPage();
  });

  return (
    <div className='container'>
      <div className='productList__header'>
        <h2 className='page-title'>Productos</h2>
        <div className='productList__functions'>
          <Link to='create'>Añadir producto</Link>
        </div>
      </div>
      <form className='productList__filters'>
        filtros
      </form>
      <ItemPagination page={null} />
    </div>
  )
};
export default ProductList;