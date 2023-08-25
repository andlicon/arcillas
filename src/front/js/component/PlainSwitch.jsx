import React from 'react';

const PlainSwitch = ({
  name,
  id,
  value,
  popOver,
  label,
  setValues
}) => {
  const onChangeHandler = ({ target }) => {
    setValues(target.name, target.checked);
  }

  return (
    <div className='row formInput'>
      <div className='col-3 d-flex justify-content-end align-items-center'>
        <label htmlFor={id}>{label}</label>
        <span className="d-inline-block popOvers" tabIndex="-1" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={popOver}>
          <button className="help btn" type="button" disabled>?</button>
        </span>
      </div>
      <div className='col-9'>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" name={name} role="switch" value={value} onChange={onChangeHandler} id={id} />
        </div>
      </div>
    </div>
  )
};
export default PlainSwitch;