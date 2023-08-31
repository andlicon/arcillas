import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/aside.css';

const AdminMenu = () => {
  return (
    <div className='aside'>
      <div className="aside-header">
        <span>Archillas PLC</span>
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