import React from 'react';
import useSelected from '../hooks/useSelected.jsx';
import ProductResults from '../component/ProductResults.jsx';

const QuoteUser = () => {
  const { selected, selectHandler, removeItems } = useSelected(null);

  return (
    <div className='container'>
      <ProductResults selectHandler={selectHandler} selected={selected} />
    </div>
  )
}
export default QuoteUser;