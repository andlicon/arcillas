import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import usePagination from '../hooks/usePagination.jsx';
import '../../styles/itemPagination.css';

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
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item${info?.prev == null ? ' disabled' : ''}`}>
              <button className={"page-link"} name='prev' onClick={nextPageHandler}>Previous</button >
            </li>

            {
              Array.from(Array(Math.ceil(info?.count / perPage) || 1)).map((e, index) => {
                const number = index + 1;
                return (
                  <li className={`page-item${currentPage == number ? ' active' : ''}`} key={index}>
                    <button className='page-link'
                      disabled={currentPage == number}
                      onClick={nextPageHandler}
                      value={number}
                      name='numberNext'>
                      {
                        number
                      }
                    </button>
                  </li>
                )
              })
            }
            <li className={`page-item${info?.next == null ? ' disabled' : ''}`}>
              <button className="page-link" name='next' onClick={nextPageHandler}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
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