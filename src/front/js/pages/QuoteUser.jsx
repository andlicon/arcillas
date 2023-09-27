import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import useSelected from '../hooks/useSelected.jsx';
import ProductTable from '../component/ProductTable.jsx';
import Modal from '../component/Modal.jsx';
import QuoteForm from '../component/QuoteForm.jsx';

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
      <div className='rounded box-shadow block p-3'>
        <h2>Cotizar productos</h2>
        <p>
          Aconsejamos revisar detalladamente cada <span className='bold'>producto</span> y <span className='bold'>cantidad</span> dentro
          de esta lista antes de iniciar el proceso de cotización.
        </p>
        <p>
          Para cotizar, deberá <span className='bold'>introducir</span> un <span className='bold'>correo electrónico</span> al
          que se le enviará la cotización de todos los productos.
        </p>
      </div>
      <div className='productList__functions button-list'>
        <Modal
          button={{
            label: `Borrar ${selected.length} (seleccionados)`,
            className: 'btn-danger',
            icon: <i className="bi bi-trash"></i>
          }}
          modal={modalDelete}
          id='deleteProduct'
          acceptFunction={removeItems} />
      </div>
      <ProductTable
        selectHandler={selectHandler}
        selected={selected}
        productList={productList}
        amountList={amountList} />
      <QuoteForm />
    </div>
  )
}
export default QuoteUser;