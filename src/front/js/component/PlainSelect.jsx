import React from 'react';

const PlainSelect = ({
  name,
  id,
  value,
  popOver,
  label,
  setValues,
  invalidFeedback,
  required,
  list_items,
  initial
}) => {
  const onChangeHandler = ({ target }) => {
    setValues(name, target.value);
  }

  return (
    <div className='row formInput'>
      <div className='col-3 d-flex justify-content-end align-items-center'>
        <label className='' htmlFor={id}>{label}</label>
        <span className="d-inline-block popOvers" tabIndex="-1" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={popOver}>
          <button className="help btn" type="button" disabled>?</button>
        </span>
      </div>
      <select className='col-9' name={name} id={id} onChange={onChangeHandler} value={value} required={required}>
        {
          initial && <option value={initial.value} key={0}>{initial.label}</option>
        }
        {
          list_items && list_items.map((element) => {
            return (
              <option value={element.id} key={element.id}>
                {
                  id == 'categoryId' ? element.hierarchy_name : element.name
                }
              </option>
            )
          })
        }
      </select>
      <div className="invalid-feedback">
        {
          invalidFeedback ? invalidFeedback : 'Input inválido'
        }
      </div>
    </div>
  )
};
export default PlainSelect;