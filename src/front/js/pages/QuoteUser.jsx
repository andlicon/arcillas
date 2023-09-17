import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import useSelected from '../hooks/useSelected.jsx';
import ProductTable from '../component/ProductTable.jsx';

const QuoteUser = () => {
  const { store } = useContext(Context);
  const { selected, selectHandler, removeItems } = useSelected(null);
  const [productList, setProductList] = useState([]);
  const [amountList, setAmountList] = useState([])

  useEffect(() => {
    const newProductList = store?.quoteList?.map(
      (quote) => {
        return quote.product
      });
    setProductList(() => newProductList);

    const newAmountList = store?.quoteList?.map(
      (quote) => {
        return quote.amount
      });
    setAmountList(() => newAmountList)
  }, [store.quoteList]);

  return (
    <div className='container'>
      <ProductTable
        selectHandler={selectHandler}
        selected={selected}
        productList={productList}
        amountList={amountList} />
    </div>
  )
}
export default QuoteUser;