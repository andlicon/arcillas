import React from 'react';

const PlainInput = ({
  name,
  id,
  type,
  value,
  popOver,
  label,
  setValues,
  invalidFeedback,
  required
}) => {
  return (
    <div className='row formInput'>
      <div className='col-3 d-flex justify-content-end align-items-center'>
        <label className='' htmlFor={id}>{label}</label>
        <span className="d-inline-block popOvers" tabIndex="-1" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={popOver}>
          <button className="help btn" type="button" disabled>?</button>
        </span>
      </div>
      <input className='col-9' id={id} name={name} type={type} onChange={setValues} value={value} required={required} />
      <div className="invalid-feedback">
        {
          invalidFeedback ? invalidFeedback : 'Input inválido'
        }
      </div>
    </div>
  )
};
export default PlainInput;