import React from 'react';
import { Link } from "react-router-dom";

const DropDownItem = ({ label, to }) => {
  return (
    <Link to={to}>
      {label}
    </Link>
  );
};
export default DropDownItem;