import React from 'react';
import '../../styles/dropdown.css';
import DropDownItem from './DropDownItem.jsx';

const DropDown = ({ label, items, id }) => {
  return (
    <div className='dropDown'>
      <button className="btn btn-primary dropDown__button" type="button" data-bs-toggle="collapse" data-bs-target={'#' + id} aria-expanded="false" aria-controls="collapseExample">
        {label}
      </button>
      <div className="collapse" id={id}>
        <div className="card card-body">
          {
            items.map((item, index) => {
              return (
                <DropDownItem key={index} label={item.label} to={item.to} />
              )
            })
          }
        </div>
      </div>
    </div>
  );
};
export default DropDown;