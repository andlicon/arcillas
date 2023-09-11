import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import usePagination from '../hooks/usePagination.jsx';
import '../../styles/itemPagination.css';
import PageNavigation from '../component/PageNavigation.jsx';
import ItemPerPage from '../component/ItemPerPage.jsx';

const ItemPagination = () => {
  const { store } = useContext(Context);
  const { productPage } = store;
  const { info, results } = productPage;
  const {
    perPage,
    currentPage,
    nextPageHandler,
    perPageHandler
  } = usePagination();

  return (
    <div className='itemPagination'>
      <div>
        <PageNavigation perPage={perPage} />
      </div>
      <ItemPerPage perPage={perPage} />
      <div>
        <span className='itemPagination__count'>
          {
            `${((currentPage - 1) * perPage) + 1} - ${((currentPage - 1) * perPage) + results?.length} de productos ${info?.count}`
          }
        </span>
      </div>
    </div >
  );

};
export default ItemPagination;