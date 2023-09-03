import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail.jsx';
import '../../styles/productDetail.css';
import CategoriesHierarchy from '../component/CategoriesHierarchy.jsx';
import BackTo from '../component/BackTo.jsx';

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
      <div className='d-flex align-items-center productDetail__header'>
        <BackTo text='Volver' to='/' />
        <span className='separator'>|</span>
        <CategoriesHierarchy categoryFamily={categoryHierarchy} />
      </div>
      aaaaa
    </div>
  );
};
export default ProductDetail;