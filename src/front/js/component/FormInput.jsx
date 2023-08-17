import React from 'react';
import '../../styles/formInput.css';

const FormInput = ({ type, label, restriction, name, id, value, setValue }) => {

  const onChangeHandler = ({ target }) => {
    if (restriction && !restriction()) {
      return null;
    }

    setValue(target.value, name)
  };

  return (
    <div className='formInput'>
      <input
        id={id}
        name={name}
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