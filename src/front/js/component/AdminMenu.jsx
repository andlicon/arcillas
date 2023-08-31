import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/aside.css';
import logoUrl from '../../img/arcillas-logo.png';

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
        <Link to='/'>
          Dashboard
        </Link>
        <Link to='/'>
          Products
        </Link>
      </div>
    </div>
  );
};
export default AdminMenu;