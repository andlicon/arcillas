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

  return (
    <Modal
      button={modalButton}
      modal={modal}
      id={`quote${product.id}`}
      acceptFunction={() => okFunction(amount)}>
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