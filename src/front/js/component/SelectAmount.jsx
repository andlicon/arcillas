import React from 'react'
import { useField } from '../hooks/useField.jsx';
import '../../styles/selectAmount.css';
import {
  INPUT_TYPE_TEXT
} from '../constant/inputConstant.js';
import { dontCloseDropDownItem } from '../utils/domUtils';

const SelectAmount = ({ value, onChange }) => {
  const more = useField({ type: INPUT_TYPE_TEXT, initial: null });

  dontCloseDropDownItem('select-more');

  return (
    <div className="dropdown selectAmount">
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Cantidad:
        <span className='amount'>{value}</span>
        {value > 1 ? 'unidades' : 'unidad'}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button className="dropdown-item" type='button' value={1} onClick={onChange}>
          1 unidad
        </button>
        <button className="dropdown-item" type='button' value={2} onClick={onChange}>
          2 unidades
        </button>
        <button className="dropdown-item" type='button' value={3} onClick={onChange}>
          3 unidades
        </button>
        <button className="dropdown-item" type='button' value={4} onClick={onChange}>
          4 unidades
        </button>
        <button className="dropdown-item" type='button' value={5} onClick={onChange}>
          5 unidades
        </button>
        <div className='dropdown-items'>
          <button className="dropdown-item" id='select-more' type='button'>
            Especificar cantidad
          </button>
          <div className='dropdown-item'>
            <input type="text" placeholder='Cantidad...' value={more.value} onChange={more.onChange} />
            <button value={more.value} type='button' onClick={onChange}>
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectAmount;