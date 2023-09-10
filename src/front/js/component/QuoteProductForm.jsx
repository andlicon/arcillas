import React from 'react';
import { useField } from '../hooks/useField.jsx';
import { INPUT_TYPE_SELECT } from '../constant/inputConstant.js';
import SelectAmount from '../component/SelectAmount.jsx';

const QuoteProductForm = ({ productId }) => {
  const amount = useField({ type: INPUT_TYPE_SELECT, initial: 1 });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('se Cotizaran ' + amount.value + ' del siguiente producto ' + productId);
  }


  return (
    <form action="" onSubmit={onSubmitHandler}>
      <SelectAmount value={amount.value} onChange={amount.onChange} />
      <button className='btn btn--yellow w-100'>
        Añadir a lista de cotizar
      </button>
    </form>
  )
}
export default QuoteProductForm;