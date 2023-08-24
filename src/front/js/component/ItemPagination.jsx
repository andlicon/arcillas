import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/itemPagination.css';
import ProductResults from '../component/ProductResults.jsx';


const ItemPagination = () => {
  const [perPage, setPerPage] = useState(5);
  const { store } = useContext(Context);
  const { productPage } = store;
  const { info, results } = productPage;

  // console.log(results)

  const pages = Math.ceil(info?.count / perPage);

  const onChangeHandler = ({ target }) => {
    setPerPage(target.value);
  };

  return (
    <div className='itemPagination'>

      <ProductResults product_list={results} />

      <div>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link">Previous</button>
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
            <li className="page-item">
              <button className="page-link">Next</button>
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