import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import ProductForm from '../component/ProductForm.jsx';
import BackTo from '../component/BackTo.jsx';

const ProductEdit = () => {
  const { actions } = useContext(Context);
  const { putProduct } = actions;

  const onSubmit = async (product) => {
    const id = product.get('id');
    await putProduct(id, product);
  };

  return (
    <div className='container'>
      <div className='productCreate__header'>
        <h1 className='page-title'>Añade un nuevo producto</h1>
        <BackTo to='/admin/product' text='Volver a la lista de productos' />
      </div>

      <ProductForm
        action='edit'
        onSubmit={onSubmit} />
    </div >
  );
};
export default ProductEdit;