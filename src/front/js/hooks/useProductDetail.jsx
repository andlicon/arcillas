import { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext.js';
import { useNavigate } from "react-router-dom";
import { orderCategoriesByParent } from '../utils/orderUtils.js';

const useProductDetail = (productId) => {
  const { actions } = useContext(Context);
  const { getOneProduct, getCategoryHierarchyParents } = actions;
  const [product, setProduct] = useState({});
  const [categoryHierarchy, setCategoryHierarchy] = useState([]);
  const [found, setFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getOneProduct(productId)
      .then(response => {
        if (response != null) {
          setProduct(response);
          setFound(true);
        }
        else navigate('/not-found');
      })
  }, []);

  useEffect(() => {
    if (product?.category_id != undefined) {
      getCategoryHierarchyParents(product.category_id)
        .then(response => {
          const ordered = orderCategoriesByParent(response);
          setCategoryHierarchy(ordered);
        })
    }
  }, [product.category_id]);

  useEffect(() => {
    if (product.name) {
      document.title = product.name
    }
  }, [product.name]);

  useEffect(() => {
    document.title = 'Cargando...';
  }, []);

  return ({
    product,
    categoryHierarchy,
    found
  });
};
export default useProductDetail;