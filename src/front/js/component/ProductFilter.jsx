import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext.js';
import PlainInput from './PlainInput.jsx';
import PlainSelect from './PlainSelect.jsx';

const ProductFilter = () => {
  const { store } = useContext(Context);
  const { categorys, units } = store;
  const [filter, setFilter] = useState({
    name: '',
    categoryId: 'all',
    unitId: 'all'
  });


  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onChangeInput = (name, value) => {
    setFilter({
      ...filter,
      [name]: value
    })
  };

  useEffect(() => {
    const popOverList = document.getElementsByClassName('popOvers');
    for (let i = 0; i < popOverList.length; i++) {
      const pop = popOverList[i];
      const popover = new bootstrap.Popover(pop, null);
    }
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
              <PlainSelect id='categoryId' name='categoryId' value={filter['categoryId']} label='Categoría' popOver='Categoría del producto, solo puede poseer 1' setValues={onChangeInput} required={false} list_items={categorys} />
              {/* check subcategorys */}
              <PlainSelect id='unitId' name='unitId' value={filter['unitId']} label='Unidad' popOver='Unidad en la que se presenta el producto' setValues={onChangeInput} required={false} list_items={units} />
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