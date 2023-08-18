import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/formInput.css';

const FormInput = ({ type, label, restriction, name, id, value, setValue, trim, isRequired, invalidFeedback }) => {

  const onChangeHandler = ({ target }) => {
    if (restriction && !restriction()) {
      return null;
    }

    setValue((trim ? target.value.trim() : target.value), name)
  };

  return (
    <div className='formInput'>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChangeHandler}
        value={value}
        className={`formInput__input${value == '' ? ' formInput__input--empty' : ''}`}
        required={isRequired} />
      <div className="invalid-feedback">
        {
          invalidFeedback ? invalidFeedback : 'Input inválido'
        }
      </div>
      <label htmlFor={id} className='formInput__label'>
        {
          label
        }
      </label>
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  restriction: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  trim: PropTypes.bool,
  isRequired: PropTypes.bool,
  invalidFeedback: PropTypes.string
}

export default FormInput;