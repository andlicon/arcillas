import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import Filter from '../component/Filter.jsx';
import FilterQuoteForm from '../component/FilterQuoteForm.jsx';
import ItemPagination from '../component/ItemPagination.jsx';
import ProductResults from '../component/ProductResults.jsx';

const QuoteList = () => {
  const { actions, store } = useContext(Context);

  return (
    <div className='container'>
      <div className='productList__header'>
        <h2 className='page-title'>Cotización</h2>
      </div>
      <Filter>
        <FilterQuoteForm />
      </Filter>
      {/* <ProductResults selectHandler={selectHandler} selected={selected} /> */}
      <ItemPagination page={store.quotePage} label='cotizaciones' query={actions.getQuote} />
    </div>
  )
}
export default QuoteList;