import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import useSelected from '../hooks/useSelected.jsx';
import Filter from '../component/Filter.jsx';
import FilterQuoteForm from '../component/FilterQuoteForm.jsx';
import ItemPagination from '../component/ItemPagination.jsx';
import QuoteResults from '../component/QuoteResults.jsx';

const QuoteList = () => {
  const { actions, store } = useContext(Context);
  const { selected, selectHandler, removeItems } = useSelected(null);

  useEffect(() => {
    actions.getQuote();
  }, []);

  return (
    <div className='container'>
      <div className='productList__header'>
        <h2 className='page-title'>Cotización</h2>
      </div>
      <Filter>
        <FilterQuoteForm />
      </Filter>
      <QuoteResults selectHandler={selectHandler} selected={selected} />
      <ItemPagination page={store.quotePage} label='cotizaciones' query={actions.getQuote} />
    </div>
  )
}
export default QuoteList;