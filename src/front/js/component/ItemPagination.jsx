import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/itemPagination.css';

const ItemPagination = () => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { store, actions } = useContext(Context);
  const { productPage } = store;
  const { info, results } = productPage;
  const { getProductPage } = actions;

  const onClickNextPage = ({ target }) => {
    const name = target.name;
    let filter = null;

    if (name == 'next' && info.next != null) {
      filter = info.next.replace(process.env.BACKEND_URL + '/products', '');
      setCurrentPage(parseInt(currentPage) + 1);
    }
    else if (name == 'prev' && info.prev != null) {
      filter = info.prev.replace(process.env.BACKEND_URL + '/products', '');
      setCurrentPage(parseInt(currentPage) - 1);
    }
    else if (name == 'numberNext' && target.value != currentPage) {
      const pageNumber = target.value;
      const regex = /page=.{1,4}&/;
      filter = '/?' + info.filters.replace(regex, 'page=' + pageNumber + '&');
      setCurrentPage(pageNumber);
    }

    if (filter != null) {
      getProductPage(filter);
    }
  }

  const perPageHandler = async ({ target }) => {
    const perPageParameter = target.value;
    const regexPage = /page=.{1,4}&/;
    let filter = '/?' + info.filters.replace(regexPage, 'page' + '&');
    const regexPerPage = /per_page.{0,4}&/;
    filter = filter.replace(regexPerPage, 'per_page=' + perPageParameter + '&');
    const response = await getProductPage(filter);
    setPerPage(parseInt(perPageParameter));
    setCurrentPage(1);
  };

  return (
    <div className='itemPagination'>
      <div>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item${info?.prev == null ? ' disabled' : ''}`}>
              <button className={"page-link"} name='prev' onClick={onClickNextPage}>Previous</button >
            </li>

            {
              Array.from(Array(Math.ceil(info?.count / perPage) || 1)).map((e, index) => {
                const number = index + 1;
                return (
                  <li className={`page-item${currentPage == number ? ' active' : ''}`} key={index}>
                    <button className='page-link'
                      disabled={currentPage == number}
                      onClick={onClickNextPage}
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
              <button className="page-link" name='next' onClick={onClickNextPage}>Next</button>
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