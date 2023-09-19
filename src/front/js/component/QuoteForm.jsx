import React from 'react';
import { useField } from '../hooks/useField.jsx';

const QuoteForm = () => {
  const email = useField({ type: 'text', initial: '' });

  const onSubmit = (event) => {
    event.preventDefault();
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