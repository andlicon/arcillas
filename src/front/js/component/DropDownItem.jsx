import React from 'react';
import { Link } from "react-router-dom";

const DropDownItem = ({ label, to }) => {
  return (
    <Link to={to} className='btn dropDown__item'>
      {label}
    </Link>
  );
};
export default DropDownItem;