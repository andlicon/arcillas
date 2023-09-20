import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useField } from '../hooks/useField.jsx';

const QuoteForm = () => {
  const { actions, store } = useContext(Context);
  const email = useField({ type: 'text', initial: '' });

  const getQuote = () => {
    const quote_items = store.quoteList.map((quote) => {
      return (
        {
          amount: quote.amount,
          product_id: quote.product.id
        }
      )
    });

    return {
      quote_items,
      email: email.value
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    actions.postQuote(getQuote());
  }

  return (
    <form
      onSubmit={onSubmit}
      className='quoteForm rounded p-3 box-shadow block'>
      <div className='form-group'>
        <label
          className='form-label bold'
          htmlFor="email">
          Email
        </label>
        <input
          className='form-control'
          id='email'
          placeholder='JohnDoe@example.com'
          type={email.type}
          onChange={email.onChange}
          value={email.value} />
      </div>
      <button
        className='btn btn-success'
        type='submit'>
        Cotizar
      </button>
    </form>
  )
}
export default QuoteForm;