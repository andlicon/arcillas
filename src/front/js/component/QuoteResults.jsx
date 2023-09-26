import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/productResults.css';
import QuoteTable from './QuoteTable.jsx';

const QuoteResults = ({ selectHandler, selected }) => {
  const { store } = useContext(Context);
  const { quotePage } = store;
  const { results } = quotePage;

  return (
    <QuoteTable
      quoteList={results}
      isAdmin={true}
      selected={selected}
      selectHandler={selectHandler} />
  )
};
export default QuoteResults;