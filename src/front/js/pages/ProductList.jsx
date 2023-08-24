import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Context } from '../store/appContext.js';
import ItemPagination from '../component/ItemPagination.jsx';
import ProductResults from '../component/ProductResults.jsx';

const ProductList = () => {
  const [selected, setSelected] = useState([]);

  const selectHandler = ({ target }) => {
    const value = target.value;

    if (value == 'all' && selected.some(id => id == 'all')) {
      setSelected([]);
    }
    else if (value == 'all' && !selected.some(id => id == 'all')) {
      setSelected(['all']);
    }
    else if (selected.some(id => id == value)) {
      setSelected(selected.filter(id => id != value));
    }
    else {
      setSelected([...selected, value]);
    }
  };

  console.log(selected);

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
      <ProductResults selectHandler={selectHandler} />
      <ItemPagination page={null} />
    </div>
  )
};
export default ProductList;