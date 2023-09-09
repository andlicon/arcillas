import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/formInput.css';

const AnimatedInput = ({
  type,
  label,
  restriction,
  name,
  id,
  value,
  onChange,
  trim,
  isRequired,
  invalidFeedback,
  bootstrapIcon }) => {

  const onChangeHandler = (e) => {
    if (restriction && !restriction()) {
      return null;
    }

    onChange(e);
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
      <label htmlFor={id} className='formInput__label'>
        {
          label
        }
      </label>
      <i className={`formInput__icon b ${bootstrapIcon}`}></i>
      <div className="invalid-feedback">
        {
          invalidFeedback ? invalidFeedback : 'Input inválido'
        }
      </div>
    </div>
  );
};

AnimatedInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  restriction: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  trim: PropTypes.bool,
  isRequired: PropTypes.bool,
  invalidFeedback: PropTypes.string,
  bootstrapIcon: PropTypes.string
}

export default AnimatedInput;