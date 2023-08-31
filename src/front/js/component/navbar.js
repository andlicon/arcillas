import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" id='menu-offcanvas' data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Enable both scrolling & backdrop</button>
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">Check the Context in action</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
