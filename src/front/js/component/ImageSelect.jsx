import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/imageSelect.css';

const ImageSelect = ({ images }) => {
  return (
    <div className='col-12 col-md-1 imageSelect'>
      {
        images.map((url, index) => {
          return (
            <img
              key={index}
              src={url}
              alt="Product item"
              className='imageSelect__img' />
          )
        })
      }
    </div>
  );
};
ImageSelect.propTypes = {
  images: PropTypes.array
};
export default ImageSelect;