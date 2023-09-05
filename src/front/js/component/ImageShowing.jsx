import React from 'react';

const ImageShowing = ({ images }) => {
    return (
        <div className='col-12 col-md-11'>
            {
                images.map((url, index) => {
                    return (
                        <div key={index}>
                            {
                                url
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};
export default ImageShowing;