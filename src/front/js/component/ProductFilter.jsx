import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext.js';
import {
  activatePopOvers
} from '../utils/domUtils.js'
import PlainInput from './PlainInput.jsx';
import PlainSelect from './PlainSelect.jsx';
import PlainSwitch from './PlainSwitch.jsx';

const ProductFilter = () => {
  const { store, actions } = useContext(Context);
  const { getProductPage } = actions;
  const { categorys, units } = store;
  const [filter, setFilter] = useState({
    name: '',
    categoryId: 'all',
    unitId: 'all',
    subCategory: false
  });


  const onSubmitHandler = (event) => {
    event.preventDefault();
    let filters = ''
    const nameFilter = filter['name'].trim();
    filters += `/?name${nameFilter != '' ? `=${nameFilter}` : ''}&`;
    const categoryFilter = filter['categoryId'];
    filters += `category${categoryFilter != 'all' ? `=${categoryFilter}` : ''}&`;
    const unitFilter = filter['unitId'];
    filters += `unit${unitFilter != 'all' ? `=${unitFilter}` : ''}&`;
    const subCategoryFilter = filter['subCategory'];
    filters += `sub_category${subCategoryFilter != 'all' ? `=${subCategoryFilter}` : ''}`;

    getProductPage(filters);
  };

  const onChangeInput = (name, value) => {
    setFilter({
      ...filter,
      [name]: value
    })
  };

  useEffect(() => {
    activatePopOvers();
  }, [])

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
              <PlainInput id='name' name='name' value={filter['name']} label='Nombre' type='text' popOver='Nombre del producto' setValues={onChangeInput} required={false} />
              <PlainSelect id='categoryId' name='categoryId' value={filter['categoryId']} label='Categoría' popOver='Categoría del producto, solo puede poseer 1' setValues={onChangeInput} required={false} list_items={categorys} initial={{ value: 'all', label: 'Todos' }} />
              <PlainSwitch name='subCategory' id='subCategory' value={filter['subCategory']} popOver='Habilitar para buscar subcategorías' setValues={onChangeInput} label='Buscar subcategorías' />
              <PlainSelect id='unitId' name='unitId' value={filter['unitId']} label='Unidad' popOver='Unidad en la que se presenta el producto' setValues={onChangeInput} required={false} list_items={units} initial={{ value: 'all', label: 'Todos' }} />
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