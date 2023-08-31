import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/aside.css';
import logoUrl from '../../img/arcillas-logo.png';
import DropDown from './DropDown.jsx';

const catalogItems = [
  { label: 'Productos', to: '/admin/product' },
  { label: 'Categorias', to: '/admin/categor' }
];


const AdminMenu = () => {
  return (
    <div className='aside'>
      <div className="aside-header">
        <Link to='/admin/dashboard' className='aside__home'>
          <img
            className='aside__logo'
            src={logoUrl}
            alt="arcillas plc logo" />
          <span className='aside__title'>Arcillas PLC</span>
        </Link>
      </div >
      <div className="menu">
        <ul>
          <li>
            <Link to='/'>
              Dashboard
            </Link>
          </li>
          <li>
            <DropDown label={'catalog'} id='catologDropDown' items={catalogItems} />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AdminMenu;