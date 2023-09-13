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

  const perPage = 12;

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

  const setTitle = () => {
    if (categoryId) {
      const category = store.categorys.filter((category) => category.id == categoryId)[0];
      document.title = category?.name + ' | Arcillas Puerto La Cruz';
    }
    else {
      document.title = 'Arcillas Puerto La Cruz';
    }
  }

  useEffect(() => {
    setTitle();
    actions.setPerPage(perPage);
  }, []);

  useEffect(() => {
    setTitle();
    lookForProducts();
  }, [categoryId]);

  return (
    <div className='container'>
      <div className='row pt-3'>
        <VerticalItemNavigation col='col-3 col-lg-2' itemList={store.categorys} />
        <div className="col-9 col-lg-10">
          <div className="row justify-content-between g-3 mt-0 product-row">
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