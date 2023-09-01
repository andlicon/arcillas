import React from 'react';
import { useParams } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail.jsx';

const ProductDetail = () => {
  const { productId } = useParams();
  const { product } = useProductDetail(productId);

  return (
    <div className='container'>
      aaaaa
    </div>
  );
};
export default ProductDetail;