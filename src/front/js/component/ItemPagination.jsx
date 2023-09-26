import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/itemPagination.css';
import PageNavigation from '../component/PageNavigation.jsx';
import ItemPerPage from '../component/ItemPerPage.jsx';

const ItemPagination = ({ label, query, page }) => {
  const { store } = useContext(Context);
  const { currentPage, perPage } = store;
  const { info, results } = page;

  return (
    <div className='itemPagination'>
      <PageNavigation page={page} />
      <ItemPerPage label={label} query={query} page={page} />
      <div>
        <span className='itemPagination__count'>
          {
            `${((currentPage - 1) * perPage) + 1} - ${((currentPage - 1) * perPage) + results?.length} de ${label} ${info?.count}`
          }
        </span>
      </div>
    </div >
  );

};
export default ItemPagination;