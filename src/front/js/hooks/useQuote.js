import { useState, useContext } from 'react';
import { Context } from '../store/appContext';

export const useQuote = ({ product, amount }) => {
  const { actions } = useContext(Context);
  const [productAmount, setProductAmount] = useState(amount);

  const remove = () => {
    actions.removeQuoteProduct(product);
  }

  const setAmount = (newAmount) => {
    setProductAmount(newAmount);
  }

  return ({
    product,
    productAmount,
    setAmount,
    remove
  })
}