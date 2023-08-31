import React from 'react';
import '../../styles/menu.css';
import AdminMenu from './AdminMenu.jsx';

const Menu = ({ children }) => {
  return (
    <div className='menu-container'>
      <div id='menu' className="sidebar-container">
        <div className='sidebar'>
          {
            <AdminMenu />
          }
        </div>
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
          {
            <AdminMenu />
          }
        </div>
      </div>
      <div className='content'>
        {
          children
        }
      </div>
    </div>
  );
};
export default Menu;