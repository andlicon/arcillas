import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import useSelected from '../hooks/useSelected.jsx';
import ProductTable from '../component/ProductTable.jsx';
import Modal from '../component/Modal.jsx';

const modalDelete = {
  body: '¿Estás seguro que quieres ejecutar esta función?',
  title: '¿Estás seguro?',
  accept: 'Borrar',
  cancel: 'Cancelar'
}

const QuoteUser = () => {
  const { store, actions } = useContext(Context);
  const { selected, selectHandler, removeItems } = useSelected(actions.removeQuoteProduct);
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
      <div className='productList__functions button-list'>
        <Modal
          button={{ label: `Borrar ${selected.length} (seleccionados)`, className: 'btn-danger', icon: <i className="bi bi-trash"></i> }}
          modal={modalDelete}
          id='deleteProduct'
          acceptFunction={removeItems} />
      </div>
      <ProductTable
        selectHandler={selectHandler}
        selected={selected}
        productList={productList}
        amountList={amountList} />
    </div>
  )
}
export default QuoteUser;