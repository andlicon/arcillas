import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/productResults.css';
import QuoteTable from './QuoteTable.jsx';

const QuoteResults = ({ selectHandler, selected }) => {
  const { store, actions } = useContext(Context);
  const { quotePage } = store;
  const { results } = quotePage;

  useEffect(() => {
    actions.getQuote();
  }, []);

  return (
    <QuoteTable
      quoteList={results}
      isAdmin={true}
      selected={selected}
      selectHandler={selectHandler} />
  )
};
export default QuoteResults;