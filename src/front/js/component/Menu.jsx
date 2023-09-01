import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import AdminMenu from '../component/AdminMenu.jsx';
import '../../styles/menu.css';

const Menu = ({ children }) => {
  const { store } = useContext(Context);
  const { user } = store;

  const getMenu = () => {
    if (user?.role == 'administrador') return <AdminMenu />;

    return null;
  }

  return (
    <div className={`menu-container ${user?.role != null ? ' has-menu' : ''}`}>
      {
        user?.role != null &&
        <div id='menu' className="sidebar-container">
          <div className='sidebar'>
            {
              getMenu()
            }
          </div>
          <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            {
              getMenu()
            }
          </div>
        </div>
      }
      <div className='content'>
        {
          children
        }
      </div>
    </div>
  );
};
export default Menu;