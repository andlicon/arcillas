import React from 'react'
import '../../styles/selectAmount.css';

const SelectAmount = ({ value, onChange }) => {
  return (
    <div className='selectAmount'>
      <span>Cantidad:</span>
      <select name="" id="" className='form-select' onChange={onChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <span>{value > 1 ? 'unidades' : 'unidad'}</span>
    </div>
  );
};
export default SelectAmount;