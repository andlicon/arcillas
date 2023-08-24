import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/itemPagination.css';

const ItemPagination = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { store, actions } = useContext(Context);
  const { productPage } = store;
  const { info } = productPage;
  const { getProductPage } = actions;

  const onClickNextPage = ({ target }) => {
    const name = target.name;
    let filter = null;

    if (name == 'next' && info.next != null) {
      filter = info.next.replace(process.env.BACKEND_URL + '/products', '');
      setCurrentPage(currentPage + 1);
    }
    else if (name == 'prev' && info.prev != null) {
      filter = info.prev.replace(process.env.BACKEND_URL + '/products', '');
      setCurrentPage(currentPage - 1);
    }
    else if (name == 'numberNext') {
      const pageNumber = target.value;
      if (pageNumber == currentPage) return null
      const regex = /page=.{1,4}&/;
      filter = info.filters.replace(regex, 'page=' + pageNumber + '&');
      setCurrentPage(pageNumber);
    }

    if (filter != null) {
      getProductPage(filter);
    }
  }

  const onChangeHandler = ({ target }) => {
    setPerPage(target.value);
  };

  return (
    <div className='itemPagination'>
      <div>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item${info?.prev == null ? ' disabled' : ''}`}>
              <button className={"page-link"} name='prev' onClick={onClickNextPage}>Previous</button >
            </li>
            <li className={`page-item${currentPage == 1 ? ' disabled' : ''}`}>
              <button className='page-link'
                disabled={currentPage == 1}
                onClick={onClickNextPage}
                value={1}
                name='numberNext'>
                1
              </button>
            </li>
            <li className={`page-item${currentPage == 2 ? ' disabled' : ''}`}>
              <button className='page-link'
                disabled={currentPage == 2}
                onClick={onClickNextPage}
                value={2}
                name='numberNext'>
                2
              </button >
            </li>
            <li className={`page-item${currentPage == 3 ? ' disabled' : ''}`}>
              <button className='page-link'
                disabled={currentPage == 3}
                onClick={onClickNextPage}
                value={3}
                name='numberNext'>
                3
              </button >
            </li>
            <li className={`page-item${info?.next == null ? ' disabled' : ''}`}>
              <button className="page-link" name='next' onClick={onClickNextPage}>Next</button>
            </li>
          </ul>
        </nav>
      </div>

      <select name="perPage" id="perPage" onChange={onChangeHandler}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div >
  );

};
export default ItemPagination;