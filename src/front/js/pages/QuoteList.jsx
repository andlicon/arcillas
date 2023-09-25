import React from 'react';
import ProductFilter from '../component/ProductFilter.jsx';

const QuoteList = () => {
  return (
    <div className='container'>
      <div className='productList__header'>
        <h2 className='page-title'>Cotización</h2>
      </div>
      <ProductFilter />

    </div>
  )
}
export default QuoteList;