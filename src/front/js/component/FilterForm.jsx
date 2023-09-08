import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import { useField } from '../hooks/useField.jsx';
import PlainInput from './PlainInput.jsx';
import PlainSelect from './PlainSelect.jsx';
import PlainSwitch from './PlainSwitch.jsx';
import {
  INPUT_TYPE_SELECT,
  INPUT_TYPE_SWITCH,
  INPUT_TYPE_TEXT
} from '../constant/inputConstant.js';

const FilterForm = () => {
  const name = useField({ type: INPUT_TYPE_TEXT });
  const category = useField({ type: INPUT_TYPE_SELECT });
  const subCategory = useField({ type: INPUT_TYPE_SWITCH });
  const unit = useField({ type: INPUT_TYPE_SELECT });
  const { store, actions } = useContext(Context);
  const { getProductPage } = actions;
  const { categorys, units } = store;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    saveFilter();
    getProductPage();
  };

  return (
    <form className="accordion-body" onSubmit={onSubmitHandler}>
      <div>
        <PlainInput
          id='name'
          name='name'
          value={name.value}
          label='Nombre'
          type={name.type}
          popOver='Nombre del producto'
          setValues={name.onChange}
          required={false} />
        <PlainSelect
          id='category'
          name='category'
          value={category.value}
          label='Categoría' popOver='Categoría del producto, solo puede poseer 1'
          setValues={category.onChange}
          required={false}
          list_items={categorys}
          initial={{ value: 'all', label: 'Todos' }} />
        <PlainSwitch
          name='subCategory'
          id='subCategory'
          value={subCategory.value}
          popOver='Habilitar para buscar subcategorías'
          setValues={subCategory.onChange}
          label='Buscar subcategorías' />
        <PlainSelect
          id='unit'
          name='unit'
          value={unit.value}
          label='Unidad'
          popOver='Unidad en la que se presenta el producto'
          setValues={unit.onChange}
          required={false}
          list_items={units}
          initial={{ value: 'all', label: 'Todos' }} />
      </div>
      <button>
        Buscar
      </button>
    </form>
  )
}
export default FilterForm;