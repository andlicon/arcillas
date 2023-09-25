import React from 'react';
import usePopOver from '../hooks/usePopOver.jsx';
import PlainInput from './PlainInput.jsx';
import PlainSelect from './PlainSelect.jsx';

const FilterQuoteForm = () => {
  // status Enum.status

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // saveFilter();
    // getProductPage();
  };

  usePopOver();

  return (
    <form className="accordion-body" onSubmit={onSubmitHandler}>
      <div>
        <PlainInput
          id='email'
          name='email'
          // value={filter['name']}
          label='Email'
          type='text'
          popOver='Email de la cotización'
          // setValues={({ target }) => setFilterHandler(target.name, target.value)}
          required={false} />
        <PlainInput
          id='item_count'
          name='item_count'
          // value={filter['name']}
          label='Cantidad de productos'
          type='text'
          popOver='Cantidad de productos'
          // setValues={({ target }) => setFilterHandler(target.name, target.value)}
          required={false} />
        <PlainSelect
          id='Estado'
          name='Estado'
          // value={filter['category']}
          label='Estado de la cotización'
          popOver='Estado actual de la cotización'
          // setValues={({ target }) => setFilterHandler(target.name, target.value)}
          required={false}
          // list_items={categorys}
          initial={{ value: 'all', label: 'Todos' }} />
        <PlainInput
          id='date'
          name='date'
          // value={filter['name']}
          label='Fecha cotización'
          type='month'
          popOver='Año y mes en que se solicitó'
          // setValues={({ target }) => setFilterHandler(target.name, target.value)}
          required={false} />
      </div>
      <button>
        Buscar
      </button>
    </form>
  )
}
export default FilterQuoteForm;