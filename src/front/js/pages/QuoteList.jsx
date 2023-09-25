import React from 'react';
import Filter from '../component/Filter.jsx';
import FilterQuoteForm from '../component/FilterQuoteForm.jsx';

const QuoteList = () => {
  return (
    <div className='container'>
      <div className='productList__header'>
        <h2 className='page-title'>Cotización</h2>
      </div>
      <Filter>
        <FilterQuoteForm />
      </Filter>
    </div>
  )
}
export default QuoteList;