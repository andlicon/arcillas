import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useField } from '../hooks/useField.jsx';
import { INPUT_TYPE_SELECT } from '../constant/inputConstant.js';
import SelectAmount from '../component/SelectAmount.jsx';

const QuoteProductForm = ({ product }) => {
  const { actions } = useContext(Context);
  const amount = useField({ type: INPUT_TYPE_SELECT, initial: 1 });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    actions.addQuoteProduct({ product: product, amount: amount.value });
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