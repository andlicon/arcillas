import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import useFilter from '../hooks/useFilter.jsx';
import usePopOver from '../hooks/usePopOver.jsx';
import PlainInput from './PlainInput.jsx';
import PlainSelect from './PlainSelect.jsx';
import PlainSwitch from './PlainSwitch.jsx';

const ProductFilter = () => {
  const { store, actions } = useContext(Context);
  const { getProductPage } = actions;
  const { categorys, units } = store;
  const {
    filter,
    setFilterHandler,
    saveFilter } = useFilter();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    saveFilter();
    getProductPage();
  };

  useEffect(() => {
    getProductPage();
  }, []);

  usePopOver();

  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#searchFilter" aria-expanded="true" aria-controls="searchFilter">
            Buscar
          </button>
        </h2>
        <div id="searchFilter" className="accordion-collapse collapse show">
          <form className="accordion-body" onSubmit={onSubmitHandler}>
            <div>
              <PlainInput id='name' name='name' value={filter['name']} label='Nombre' type='text' popOver='Nombre del producto' setValues={setFilterHandler} required={false} />
              <PlainSelect id='category' name='category' value={filter['category']} label='Categoría' popOver='Categoría del producto, solo puede poseer 1' setValues={setFilterHandler} required={false} list_items={categorys} initial={{ value: 'all', label: 'Todos' }} />
              <PlainSwitch name='subCategory' id='subCategory' value={filter['subCategory']} popOver='Habilitar para buscar subcategorías' setValues={setFilterHandler} label='Buscar subcategorías' />
              <PlainSelect id='unit' name='unit' value={filter['unit']} label='Unidad' popOver='Unidad en la que se presenta el producto' setValues={setFilterHandler} required={false} list_items={units} initial={{ value: 'all', label: 'Todos' }} />
            </div>
            <button>
              Buscar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};
export default ProductFilter;