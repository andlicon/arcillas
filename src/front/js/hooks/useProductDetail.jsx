import { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext.js';
import { orderCategoriesByParent } from '../utils/orderUtils.js';

const useProductDetail = (productId) => {
  const { actions } = useContext(Context);
  const { getOneProduct, getCategoryHierarchyParents } = actions;
  const [found, setFound] = useState(true);
  const [product, setProduct] = useState({});
  const [categoryHierarchy, setCategoryHierarchy] = useState([]);

  useEffect(() => {
    getOneProduct(productId)
      .then(response => {
        if (response != null) setProduct(response);
        else setFound(false);
      });
  }, []);

  useEffect(() => {
    if (product?.category_id != undefined) {
      getCategoryHierarchyParents(product.category_id)
        .then(response => {
          const ordered = orderCategoriesByParent(response);
          setCategoryHierarchy(ordered);
        })
    }
  }, [product?.category_id]);

  return ({
    product,
    categoryHierarchy,
    found
  });
};
export default useProductDetail;