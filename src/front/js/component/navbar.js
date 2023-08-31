import React from "react";
import { Link } from "react-router-dom";
import AdminMenu from './AdminMenu.jsx';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <button className="btn btn-primary menu-displayer" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">Check the Context in action</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
