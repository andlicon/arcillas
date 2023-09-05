import React from 'react';
import { useParams } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail.jsx';
import '../../styles/productDetail.css';
import CategoriesHierarchy from '../component/CategoriesHierarchy.jsx';
import BackTo from '../component/BackTo.jsx';
import ImageDisplay from '../component/ImageDisplay.jsx';

const ProductDetail = () => {
  const { productId } = useParams();
  const {
    product,
    categoryHierarchy,
    found
  } = useProductDetail(productId);

  return (
    <div className='container'>
      {
        !found
          ?
          <>Loading</>
          :
          <div className='container'>
            <div className='d-flex align-items-center productDetail__header'>
              <BackTo text='Volver' to='/' />
              <span className='separator'>|</span>
              <CategoriesHierarchy categoryFamily={categoryHierarchy} />
            </div>
            <div className='productDetail__content rounded'>
              <ImageDisplay images={product?.image_url} />
            </div>
          </div>
      }
    </div>
  )
};
export default ProductDetail;