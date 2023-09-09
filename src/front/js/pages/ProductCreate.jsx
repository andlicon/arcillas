import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import ProductForm from '../component/ProductForm.jsx';
import BackTo from '../component/BackTo.jsx';

const ProductCreate = () => {
  const { actions } = useContext(Context);
  const { postProduct } = actions;

  const onSubmitCreate = async (product) => {
    await postProduct(product);
  };

  return (
    <div className='container'>
      <div className='productCreate__header'>
        <h1 className='page-title'>Añade un nuevo producto</h1>
        <BackTo to='/admin/product' text='Volver a la lista de productos' />
      </div>

      <ProductForm
        action='create'
        onSubmit={onSubmitCreate} />
    </div >
  )
};
export default ProductCreate;