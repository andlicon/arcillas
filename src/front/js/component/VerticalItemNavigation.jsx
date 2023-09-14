import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/verticalNavigation.css';

const VerticalItemNavigation = ({ itemList, col }) => {
  return (
    <nav className={col + ' verticalNavigation rounded'}>
      <h3 className='text-center'>
        Categorías
      </h3>
      <ul className=''>
        {
          itemList?.map((element) => {
            return (
              <li key={element.id} className='rounded'>
                <Link to={'/category/' + element.id} className='rounded p-1'>
                  {element.name}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
};
export default VerticalItemNavigation;