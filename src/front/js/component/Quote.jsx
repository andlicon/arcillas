import React from 'react';
import { useQuote } from '../hooks/useQuote';
import LateralCard from './LateralCard.jsx';
import { TO_LEFT } from '../constant/positionalConstant.js';
import '../../styles/quote.css';

const Quote = ({ product, amount }) => {
  const quote = useQuote({ product, amount });

  return (
    <div className='quote rounded p-2 mb-2'>
      <LateralCard item={quote.product} img_side={TO_LEFT}>
        <p>
          <span className='highly'>Cantidad: </span>{quote.productAmount}
        </p>
      </LateralCard>
      <div className='quote__button'>
        <button
          className='btn btn-danger'
          onClick={() => quote.remove()}>
          Eliminar
        </button>
        <button
          className='btn btn-warning'>
          Editar
        </button>
      </div>
    </div>
  )
}
export default Quote;