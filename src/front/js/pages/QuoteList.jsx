import React from 'react';
import Filter from '../component/Filter.jsx';
import FilterProductForm from '../component/FilterProductForm.jsx';

const QuoteList = () => {
  return (
    <div className='container'>
      <div className='productList__header'>
        <h2 className='page-title'>Cotización</h2>
      </div>
      <Filter>
        <FilterProductForm />
      </Filter>
    </div>
  )
}
export default QuoteList;