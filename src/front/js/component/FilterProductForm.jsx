import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import useFilter from '../hooks/useFilter.jsx';
import usePopOver from '../hooks/usePopOver.jsx';
import PlainInput from './PlainInput.jsx';
import PlainSelect from './PlainSelect.jsx';
import PlainSwitch from './PlainSwitch.jsx';

const filterInitialValue = {
  name: '',
  category: 'all',
  unit: 'all',
  subCategory: false,
  hierarchy: []
};

const FilterProductForm = () => {
  const { store, actions } = useContext(Context);
  const { getProductPage } = actions;
  const { categorys, units } = store;
  const {
    filter,
    setFilterHandler,
    saveFilter } = useFilter(filterInitialValue);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    saveFilter();
    getProductPage();
  };

  usePopOver();

  return (
    <form className="accordion-body" onSubmit={onSubmitHandler}>
      <div>
        <PlainInput
          id='name'
          name='name'
          value={filter['name']}
          label='Nombre'
          type='text'
          popOver='Nombre del producto'
          setValues={({ target }) => setFilterHandler(target.name, target.value)}
          required={false} />
        <PlainSelect
          id='category'
          name='category'
          value={filter['category']}
          label='Categoría'
          popOver='Categoría del producto, solo puede poseer 1'
          setValues={({ target }) => setFilterHandler(target.name, target.value)}
          required={false}
          list_items={categorys}
          initial={{ value: 'all', label: 'Todos' }} />
        <PlainSwitch
          name='subCategory'
          id='subCategory'
          value={filter['subCategory']}
          popOver='Habilitar para buscar subcategorías'
          setValues={({ target }) => setFilterHandler(target.name, target.checked)}
          label='Buscar subcategorías' />
        <PlainSelect
          id='unit'
          name='unit'
          value={filter['unit']}
          label='Unidad'
          popOver='Unidad en la que se presenta el producto'
          setValues={({ target }) => setFilterHandler(target.name, target.value)}
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
export default FilterProductForm;