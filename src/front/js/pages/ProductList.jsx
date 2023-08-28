import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import { Link } from "react-router-dom";
import useSelected from '../hooks/useSelected.jsx';
import ItemPagination from '../component/ItemPagination.jsx';
import ProductResults from '../component/ProductResults.jsx';
import ProductFilter from '../component/ProductFilter.jsx';

const ProductList = () => {
  const { actions } = useContext(Context);
  const { selected, selectHandler, removeItems } = useSelected(actions.deleteProduct);

  return (
    <div className='container'>
      <div className='productList__header'>
        <h2 className='page-title'>Productos</h2>
        <div className='productList__functions'>
          <Link to='create'>Añadir producto</Link>
        </div>
        <button onClick={removeItems}>
          Eliminar productos
        </button>
      </div>
      <ProductFilter />
      <ProductResults selectHandler={selectHandler} selected={selected} />
      <ItemPagination page={null} />
    </div>
  )
};
export default ProductList;