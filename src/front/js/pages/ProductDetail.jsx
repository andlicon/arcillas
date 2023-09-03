import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail.jsx';
import CategoriesHierarchy from '../component/CategoriesHierarchy.jsx';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const {
    product,
    categoryHierarchy,
    found
  } = useProductDetail(productId);

  useEffect(() => {
    if (!found) navigate('/not-found');
  }, [found]);

  return (
    <div className='container'>
      <CategoriesHierarchy categoryFamily={categoryHierarchy} />
      aaaaa
    </div>
  );
};
export default ProductDetail;