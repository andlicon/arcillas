import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";

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
        <Link to="/">

        </Link>
        <div className="ml-auto">

        </div>
      </div>
    </nav>
  );
};
export default Navbar;