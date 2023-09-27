import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/backTo.css';

const BackTo = ({ to, text }) => {
  return (
    <Link to={to} className='back-to' role="button">
      <i className="bi bi-arrow-left-circle-fill"></i>
      {
        text
      }
    </Link>
  )
}
export default BackTo;