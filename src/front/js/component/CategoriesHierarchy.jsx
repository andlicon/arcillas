import React from 'react';
import '../../styles/categoriesHierarchy.css';

const CategoriesHierarchy = ({ categoryFamily }) => {
  return (
    <nav>
      <ol className='hierarchy hierarchy__ol'>
        {
          categoryFamily.map((category, i, list) => {
            let elementLeft = list.length - 1 - i;
            return (
              <li className='hierarchy__li' key={category.id}>
                <p className='hierarchy__p'>
                  {
                    category.name
                  }
                  {
                    elementLeft
                      ? <i className="bi bi-arrow-right-short hierarchy__icon"></i>
                      : null
                  }
                </p>
              </li>
            )
          })
        }
      </ol>
    </nav>
  )
}
export default CategoriesHierarchy;