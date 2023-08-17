import React from 'react';
import '../../styles/formInput.css';

const FormInput = ({ type, label, restriction, id }) => {
  return (
    <div className='formInput'>
      <input
        id={id}
        type={type}
        onChange={restriction && restriction}
        className='formInput__input formInput__input--empty' />
      <label htmlFor={id} className='formInput__label'>
        {
          label
        }
      </label>
    </div>
  );
};
export default FormInput;