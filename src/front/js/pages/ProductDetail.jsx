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
    category,
    unit,
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
          <div className='productDetail rounded'>
            <div className='d-flex p-1 align-items-center productDetail__header'>
              <BackTo text='Volver' to='/' />
              <span className='separator'>|</span>
              <CategoriesHierarchy categoryFamily={categoryHierarchy} />
            </div>
            <div className='productDetail__content p-2 row rounded'>
              <ImageDisplay images={[product?.image_url]} />
              <div className='productDetail__product rounded col-md-4'>
                <h2 className='productDetail__title'>
                  {product.name}
                </h2>
                <p>
                  Categoría:
                  <span className='separate'>{category?.name}</span>
                </p>
                <p>
                  Unidad:
                  <span className='separate'>{unit?.name}</span>
                </p>
                <button className='w-100'>
                  Añadir a lista de cotizar
                </button>
              </div>
              <div className='productDetails__more col-8'>
                <div className="group">
                  <h3>Descripción</h3>
                  {
                    product?.description
                  }
                </div>
                <div clasName='group'>
                  <h3>Uso</h3>
                  {
                    product?.usage
                  }
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
};
export default ProductDetail;