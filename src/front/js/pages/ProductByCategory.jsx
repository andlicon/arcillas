import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import VerticalItemNavigation from '../component/VerticalItemNavigation.jsx';
import ProductCard from '../component/ProductCard.jsx';
import PageNavigation from '../component/PageNavigation.jsx';

const ProductByCategory = () => {
  const { store, actions } = useContext(Context);
  const { categoryId } = useParams();

  const perPage = 15;

  const lookForProducts = async () => {
    let categoryFilter = '?per_page=' + perPage;

    if (categoryId) {
      const response = await actions.getCategoryHierarchy(categoryId);
      categoryFilter += '&category='
      response.forEach((category) => {
        categoryFilter += category.id + ','
      });
    }

    await actions.getProductPage(categoryFilter);
  }

  useEffect(() => {
    lookForProducts();
  }, [categoryId]);

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
          <PageNavigation perPage={perPage} />
        </div>
      </div>
    </div>
  );
};
export default ProductByCategory;