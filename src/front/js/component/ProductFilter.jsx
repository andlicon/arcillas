import React from 'react';
import usePopOver from '../hooks/usePopOver.jsx';
import FilterForm from './FilterForm.jsx';

const ProductFilter = () => {
  usePopOver();

  return (
    <div className="accordion filter-container " id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#searchFilter" aria-expanded="true" aria-controls="searchFilter">
            Buscar
          </button>
        </h2>
        <div id="searchFilter" className="accordion-collapse collapse show">
          <FilterForm />
        </div>
      </div>
    </div>
  )
};
export default ProductFilter;