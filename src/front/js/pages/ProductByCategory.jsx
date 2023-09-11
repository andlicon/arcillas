import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import VerticalItemNavigation from '../component/VerticalItemNavigation.jsx';
import ProductCard from '../component/ProductCard.jsx';
import PageNavigation from '../component/PageNavigation.jsx';

const ProductByCategory = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const { categoryId } = useParams();

  const perPage = 15;

  const lookForProducts = async () => {
    try {
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
    catch (error) {
      navigate('/not-found');
    }
  }

  useEffect(() => {
    actions.setPerPage(15);
  }, []);

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
          <PageNavigation />
        </div>
      </div>
    </div>
  );
};
export default ProductByCategory;