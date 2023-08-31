import React from 'react';
import ProductForm from '../component/ProductForm.jsx';
import BackTo from '../component/BackTo.jsx';

const ProductEdit = () => {
  return (
    <div className='container-fluid'>
      <div className='productCreate__header'>
        <h1 className='page-title'>Añade un nuevo producto</h1>
        <BackTo to='/admin/product' text='Volver a la lista de productos' />
      </div>

      <ProductForm action='edit' />
    </div >
  );
};
export default ProductEdit;