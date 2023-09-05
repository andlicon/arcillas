import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/ImageDisplay.css';
import ImageSelect from '../component/ImageSelect.jsx';
import ImageShowing from '../component/ImageShowing.jsx';

const ImageDisplay = ({ images }) => {
  return (
    <div className='ImageDisplay row'>
      <ImageSelect images={images} />
      <ImageShowing images={images} />
    </div>
  );
};
ImageDisplay.propTypes = {
  images: PropTypes.array
};
export default ImageDisplay;