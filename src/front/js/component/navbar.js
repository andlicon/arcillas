import React from "react";
import { Link } from "react-router-dom";
import { activateMenu } from '../utils/domUtils.js';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <button className="btn btn-primary menu-displayer" type="button" onClick={activateMenu}>
          Toggle right offcanvas
        </button>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">Check the Context in action</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
