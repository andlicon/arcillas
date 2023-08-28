import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProductForm from '../hooks/useProductForm.jsx';
import { Context } from '../store/appContext.js';

const ProductEdit = () => {
  const { store } = useContext(Context);
  const { categorys, units } = store;

  const {
    isLoading,
    formProduct,
    onChangeFormProduct,
    createProduct
  } = useProductForm({
    name: '',
    description: '',
    usage: '',
    categoryId: categorys[0]?.id,
    unitId: units[0]?.id,
    image: undefined,
    id: undefined
  });

  return (
    <>
    </>
  );
};
export default ProductEdit;