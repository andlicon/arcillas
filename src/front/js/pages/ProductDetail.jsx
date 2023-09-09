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

  const lastCategory = categoryHierarchy[categoryHierarchy?.length - 1];

  return (
    <div className='container'>
      {
        !found
          ?
          <>Loading</>
          :
          <div className='productDetail rounded'>
            <div className='d-flex p-1 align-items-center productDetail__header'>
              <BackTo text='Volver' to='/' />
              <span className='separator'>|</span>
              <CategoriesHierarchy categoryFamily={categoryHierarchy} />
            </div>
            <div className='productDetail__content p-2 row rounded'>
              <ImageDisplay images={[product?.image_url]} />
              <div className='productDetail__product col-md-4'>
                <h2>{product.name}</h2>
                <p>
                  Categoría:
                  {lastCategory?.name}
                </p>
                <button>
                  Añadir a lista de cotizar
                </button>
              </div>
              <div className='col-12'>
                <h3>Descripción</h3>
                {
                  product?.description
                }
                <h3>Uso</h3>
                {
                  product?.usage
                }
                <h3>Unidad</h3>
              </div>
            </div>
          </div>
      }
    </div>
  )
};
export default ProductDetail;