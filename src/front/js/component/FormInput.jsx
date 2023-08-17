import React, { useState } from 'react';
import '../../styles/formInput.css';

const FormInput = ({ type, label, restriction, id }) => {
  const [value, setValue] = useState('')

  const onChangeHandler = ({ target }) => {
    if (restriction && !restriction()) {
      return null;
    }

    setValue(target.value);
  };

  return (
    <div className='formInput'>
      <input
        id={id}
        type={type}
        onChange={onChangeHandler}
        value={value}
        className={`formInput__input${value == '' ? ' formInput__input--empty' : ''}`} />
      <label htmlFor={id} className='formInput__label'>
        {
          label
        }
      </label>
    </div>
  );
};
export default FormInput;