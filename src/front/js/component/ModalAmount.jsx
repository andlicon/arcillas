import React, { useState } from 'react';
import Modal from './Modal.jsx';

const modalButton = {
  icon: null,
  label: 'Editar',
  className: 'btn-warning'
}

const modal = {
  title: '¿Deseas editar la cantidad del producto a cotizar?',
  accept: 'Aceptar',
  cancel: 'Cancelar'
}

const ModalAmount = ({ product, okFunction }) => {
  const [amount, setAmount] = useState(1);

  const acceptFunctionHandler = ({ target }) => {
    if (amount > 0) {
      okFunction(amount)
    }
  }

  return (
    <Modal
      button={modalButton}
      modal={modal}
      id={`quote${product.id}`}
      acceptFunction={acceptFunctionHandler}>
      <label
        htmlFor="new-amount">
        Nueva cantidad
      </label>
      <input
        id='new-amount'
        type="text"
        onChange={({ target }) => setAmount(target.value)} />
    </Modal>
  )
}
export default ModalAmount;