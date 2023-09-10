import React from 'react';

const ImageShowing = ({ url }) => {

  console.log(url)

  return (
    <div className='col-12 col-md-7'>
      {
        <img
          src={url}
          alt="Product image"
          className='image--showing rounded' />
      }
    </div>
  );
};
export default ImageShowing;