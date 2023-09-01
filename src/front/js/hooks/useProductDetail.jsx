import { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext.js';

const useProductDetail = (productId) => {
  const { actions } = useContext(Context);
  const { getOneProduct, getCategoryHierarchyParents } = actions;
  const [product, setProduct] = useState({});
  const [categoryHierarchy, setCategoryHierarchy] = useState({});

  useEffect(() => {
    getOneProduct(productId)
      .then(response => {
        if (response != null) setProduct(response);
      })
  }, []);

  useEffect(() => {
    if (product?.category_id != undefined) {
      getCategoryHierarchyParents(product.category_id)
        .then(response => setCategoryHierarchy(response));
    }
  }, [product?.category_id]);

  return ({
    product,
    categoryHierarchy
  });
};
export default useProductDetail;