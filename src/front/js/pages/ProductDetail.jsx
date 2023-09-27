import React from 'react';
import { useParams } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail.jsx';
import '../../styles/productDetail.css';
import CategoriesHierarchy from '../component/CategoriesHierarchy.jsx';
import QuoteProductForm from '../component/QuoteProductForm.jsx';
import BackTo from '../component/BackTo.jsx';
import ImageDisplay from '../component/ImageDisplay.jsx';

const ProductDetail = ({ categoryId }) => {
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
              <BackTo text='Volver' to={'/category/' + category?.id} />
              <span className='separator'>|</span>
              <CategoriesHierarchy categoryFamily={categoryHierarchy} />
            </div>
            <div className='productDetail__content box-shadow p-2 row rounded'>
              <ImageDisplay images={[product?.image_url]} />
              <div className='productDetail__product rounded col-md-4'>
                <h2 className='productDetail__title'>
                  {product.name}
                </h2>
                <p>
                  <span className="bold">Categoría:</span>
                  <span className='separate'>{category?.name}</span>
                </p>
                <p>
                  <span className="bold">Unidad:</span>
                  <span className='separate'>{unit?.name}</span>
                </p>
                <QuoteProductForm product={product} />
              </div>
              <div className='productDetails__more col-8'>
                <div className="group">
                  <h3>Descripción</h3>
                  {
                    product?.description
                  }
                </div>
                <div className='group'>
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