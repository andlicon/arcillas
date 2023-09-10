import React, { useState } from 'react';
import { useField } from '../hooks/useField.jsx';
import { INPUT_TYPE_SELECT } from '../constant/inputConstant.js';

const QuoteProductForm = ({ productId }) => {
  const amount = useField({ type: INPUT_TYPE_SELECT, initial: 1 });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('se Cotizaran ' + amount.value + ' del siguiente producto ' + productId);
  }


  return (
    <form action="" onSubmit={onSubmitHandler}>
      <select name="" id="" onChange={amount.onChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <button className='btn btn--yellow w-100'>
        Añadir a lista de cotizar
      </button>
    </form>
  )
}
export default QuoteProductForm;