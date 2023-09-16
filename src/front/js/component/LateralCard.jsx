import React from 'react';
import '../../styles/lateralCard.css';
import {
  TO_LEFT,
  TO_RIGHT
} from '../constant/positionalConstant.js';

const LateralCard = ({ item, children, img_side }) => {
  return (
    <div className='lateralCard'>
      <img className={`lateralCard__img ${img_side == TO_RIGHT ? 'right' : ''}`}
        src={item.image_url}
        alt="" />
      <div className='lateralCard__content'>
        <p>{item.name}</p>
        {
          children
        }
      </div>
    </div>
  )
}
export default LateralCard