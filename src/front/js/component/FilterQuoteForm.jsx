import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import useFilter from '../hooks/useFilter.js';
import usePopOver from '../hooks/usePopOver.jsx';
import PlainInput from './PlainInput.jsx';
import PlainSelect from './PlainSelect.jsx';

const filterInitialValue = {
  email: '',
  status: 'all',
  item_count: '',
  date: ''
};

const FilterQuoteForm = () => {
  const { actions, store } = useContext(Context);

  const {
    filter,
    getString,
    setFilterHandler
  } = useFilter(filterInitialValue);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    actions.getQuote(getString());
  };

  usePopOver();

  return (
    <form className="accordion-body" onSubmit={onSubmitHandler}>
      <div>
        <PlainInput
          id='email'
          name='email'
          value={filter['email']}
          label='Email'
          type='text'
          popOver='Email de la cotización'
          setValues={setFilterHandler}
          required={false} />
        <PlainInput
          id='item_count'
          name='item_count'
          value={filter['item_count']}
          label='Cantidad de productos'
          type='text'
          popOver='Cantidad de productos'
          setValues={setFilterHandler}
          required={false} />
        <PlainSelect
          id='status'
          name='status'
          value={filter['status']}
          label='Estado de la cotización'
          popOver='Estado actual de la cotización'
          setValues={setFilterHandler}
          required={false}
          list_items={store.quoteStatusList}
          initial={{ value: 'all', label: 'Todos' }} />
        <PlainInput
          id='date'
          name='date'
          value={filter['date']}
          label='Fecha cotización'
          type='month'
          popOver='Año y mes en que se solicitó'
          setValues={setFilterHandler}
          required={false} />
      </div>
      <button>
        Buscar
      </button>
    </form>
  );
};
export default FilterQuoteForm;