import React from 'react';
import { Link } from "react-router-dom";
import useSelected from '../hooks/useSelected.jsx';
import ItemPagination from '../component/ItemPagination.jsx';
import ProductResults from '../component/ProductResults.jsx';
import ProductFilter from '../component/ProductFilter.jsx';

const ProductList = () => {
  const { selected, selectHandler } = useSelected();

  return (
    <div className='container'>
      <div className='productList__header'>
        <h2 className='page-title'>Productos</h2>
        <div className='productList__functions'>
          <Link to='create'>Añadir producto</Link>
        </div>
      </div>
      <ProductFilter />
      <ProductResults selectHandler={selectHandler} selected={selected} />
      <ItemPagination page={null} />
    </div>
  )
};
export default ProductList;