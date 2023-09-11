import React from 'react';
import { usePageNavigation } from '../hooks/usePageNavigation.jsx';

const PageNavigation = ({ perPage }) => {
  const {
    currentPage,
    prev,
    next,
    nextPageHandler,
    resultsCount,
  } = usePageNavigation(perPage);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item${prev == null ? ' disabled' : ''}`}>
          <button className={"page-link"} name='prev' onClick={nextPageHandler}>Previous</button >
        </li>

        {
          Array.from(Array(Math.ceil(resultsCount / perPage) || 1)).map((e, index) => {
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
        <li className={`page-item${next == null ? ' disabled' : ''}`}>
          <button className="page-link" name='next' onClick={nextPageHandler}>Next</button>
        </li>
      </ul>
    </nav>
  )
}
export default PageNavigation;