import React from 'react';
import { Link } from "react-router-dom";
import { useQuote } from '../hooks/useQuote';
import LateralCard from './LateralCard.jsx';
import ModalAmount from './ModalAmount.jsx';
import { TO_LEFT } from '../constant/positionalConstant.js';
import '../../styles/quote.css';

const Quote = ({ product, amount }) => {
  const quote = useQuote({ product, amount });

  return (
    <div className='quote rounded p-2'>
      <Link to={`/product/` + product.id}>
        <LateralCard item={quote.product} img_side={TO_LEFT}>
          <p>
            <span className='highly'>Cantidad: </span>{quote.productAmount}
          </p>
        </LateralCard>
      </Link>
      <div className='quote__button'>
        <button
          className='btn btn-danger'
          onClick={() => quote.remove()}>
          Eliminar
        </button>
        <ModalAmount
          product={product}
          okFunction={quote.setAmount} />
      </div>
    </div>
  )
}
export default Quote;