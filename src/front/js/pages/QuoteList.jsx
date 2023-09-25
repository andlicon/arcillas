import React from 'react';
import Filter from '../component/Filter.jsx';
import FilterQuoteForm from '../component/FilterQuoteForm.jsx';
import ItemPagination from '../component/ItemPagination.jsx';
import ProductResults from '../component/ProductResults.jsx';

const QuoteList = () => {
  return (
    <div className='container'>
      <div className='productList__header'>
        <h2 className='page-title'>Cotización</h2>
      </div>
      <Filter>
        <FilterQuoteForm />
      </Filter>
      {/* <ProductResults selectHandler={selectHandler} selected={selected} /> */}
      <ItemPagination page={null} />
    </div>
  )
}
export default QuoteList;