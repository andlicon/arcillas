import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import QuoteList from './QuoteList.jsx';
import logoUrl from '../../img/arcillas-logo.png';

const Navbar = () => {
  const { store } = useContext(Context);
  const { user } = store;

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        {
          user?.role
            ? <button className="btn offcanvas__opener"
              type="button"
              data-bs-toggle="offcanvas"
              id='menu-offcanvas'
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions">
              <i className="bi bi-list"></i>
            </button>
            : null
        }
        <Link to='/' className='aside__home'>
          <img
            className='aside__logo'
            src={logoUrl}
            alt="arcillas plc logo" />
          <span className='aside__title'>Arcillas PLC</span>
        </Link>
        <QuoteList />
      </div>
    </nav>
  );
};
export default Navbar;