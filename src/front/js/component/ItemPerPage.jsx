import React from 'react';
import { usePerPage } from '../hooks/usePerPage.jsx';

const ItemPerPage = ({ label, query }) => {
  const {
    perPageHandler
  } = usePerPage({ query });

  return (
    <div className='d-flex align-items-center'>
      Mostrar
      <select name="perPage" className='form-select box-shadow' id="perPage" onChange={perPageHandler}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      {
        label
      }
    </div>
  )
}
export default ItemPerPage;