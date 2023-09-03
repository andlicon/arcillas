import React from 'react';
import '../../styles/categoriesHierarchy.css';

const CategoriesHierarchy = ({ categoryFamily }) => {
  return (
    <nav>
      <ol className='hierarchy hierarchy__ol'>
        {
          categoryFamily.map((category, i, list) => {
            let elementLeft = (list.length - 1 - i) > 0
            return (
              <li className='hierarchy__li' key={category.id}>
                <span className={`hierarchy__span${!elementLeft ? ' hierarchy__span--current' : ''}`}>
                  {
                    category.name
                  }
                  {
                    elementLeft
                      ? <i className="bi bi-arrow-right-short hierarchy__icon"></i>
                      : null
                  }
                </span>
              </li>
            )
          })
        }
      </ol>
    </nav >
  )
}
export default CategoriesHierarchy;