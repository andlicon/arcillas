import { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext.js';

const useProductDetail = (productId) => {
  const { actions } = useContext(Context);
  const { getOneProduct, getCategoryHierarchy } = actions;
  const [product, setProduct] = useState(null);
  const [categoryHierarchy, setCategoryHierarchy] = useState();

  useEffect(() => {
    getOneProduct(productId)
      .then(response => {
        if (response != null) setProduct(response);
      })
  }, []);

  useEffect(() => {
    if (product?.category_id != undefined) {
      console.log(product.category_id);
    }
  }, [product?.category_id]);

  return ({
    product
  })
}
export default useProductDetail;