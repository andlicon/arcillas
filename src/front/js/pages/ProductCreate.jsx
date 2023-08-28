import React from 'react';
import ProductForm from '../component/ProductForm.jsx';
import BackTo from '../component/BackTo.jsx';

const ProductCreate = () => {
  return (
    <div className='container'>
      <div className='productCreate__header'>
        <h1 className='productCreate__h1'>Añade un nuevo producto</h1>
        <BackTo to='/admin/product' text='Volver a la lista de productos' />
      </div>

      <ProductForm action='create' />
    </div >
  )
};
export default ProductCreate;