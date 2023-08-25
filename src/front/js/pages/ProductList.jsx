import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import ItemPagination from '../component/ItemPagination.jsx';
import ProductResults from '../component/ProductResults.jsx';
import ProductFilter from '../component/ProductFilter.jsx';

const ProductList = () => {
  const [selected, setSelected] = useState([]);

  const selectHandler = (toSelect) => {
    if (typeof toSelect == 'object') {
      setSelected(toSelect);
    }
    else if (selected.some(id => id == toSelect)) {
      setSelected(selected.filter(id => id != toSelect));
    }
    else {
      setSelected([...selected, toSelect]);
    }
  };

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