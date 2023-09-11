import React from 'react';
import { usePerPage } from '../hooks/usePerPage.jsx';

const ItemPerPage = ({ perPage }) => {
  const {
    perPageHandler
  } = usePerPage({ initial: perPage });

  return (
    <div className='d-flex align-items-center'>
      Mostrar
      <select name="perPage" className='form-select' id="perPage" onChange={perPageHandler}>
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