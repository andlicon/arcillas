import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/ImageDisplay.css';
import ImageSelect from '../component/ImageSelect.jsx';
import ImageShowing from '../component/ImageShowing.jsx';

const ImageDisplay = ({ images }) => {
  // acá estará el useEffect
  return (
    <>
      <ImageSelect images={images} />
      <ImageShowing url={images[0]} />
    </>
  );
};
ImageDisplay.propTypes = {
  images: PropTypes.array
};
export default ImageDisplay;