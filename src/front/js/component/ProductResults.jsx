import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/productResults.css';
import ProductTable from './ProductTable.jsx';

const ProductResults = ({ selectHandler, selected }) => {
  const { store, actions } = useContext(Context);
  const { productPage } = store;
  const { results } = productPage;

  useEffect(() => {
    actions.getProductPage();
  }, []);

  return (
    <ProductTable
      productList={results}
      isAdmin={true}
      selected={selected}
      selectHandler={selectHandler} />
  )
};
export default ProductResults;