import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/itemPagination.css';


const ItemPagination = () => {
  const [perPage, setPerPage] = useState(5);
  const { store, actions } = useContext(Context);
  const { productPage } = store;
  const { info } = productPage;
  const { getProductPage } = actions;

  const onClickNextPage = ({ target }) => {
    const name = target.name;
    const nextpage = name == 'next' ? info.next : info.prev;

    if (nextpage != null) {
      const filter = nextpage.replace(process.env.BACKEND_URL + '/products', '');
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
            {/* deben hacer query a la bd */}
            <li className="page-item">
              <button className="page-link" name='prev' onClick={onClickNextPage}>Previous</button>
            </li>
            <li className="page-item">
              <button className="page-link">1</button>
            </li>
            <li className="page-item">
              <button className="page-link">2</button>
            </li>
            <li className="page-item">
              <button className="page-link">3</button>
            </li>
            {/* deben hacer query a la bd */}
            <li className="page-item">
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