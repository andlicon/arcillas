import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import VerticalItemNavigation from '../component/VerticalItemNavigation.jsx';
import ProductCard from '../component/ProductCard.jsx';

const ViewProduct = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getProductPage();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <VerticalItemNavigation col='col-3 col-lg-2' itemList={store.categorys} />
        <div className="col-9 col-lg-10">
          <div className="row g-2">
            {
              store?.productPage?.results?.map((element) => {
                return (
                  <ProductCard key={element.id} product={element} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewProduct;