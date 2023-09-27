import React from 'react';
import { usePerPage } from '../hooks/usePerPage.jsx';

const ItemPerPage = () => {
  const {
    perPageHandler
  } = usePerPage();

  return (
    <div className='d-flex align-items-center'>
      Mostrar
      <select name="perPage" className='form-select box-shadow' id="perPage" onChange={perPageHandler}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      productos
    </div>
  )
}
export default ItemPerPage;