import { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';

const useFormProduct = (initialFormProduct) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formProduct, setFormProduct] = useState(initialFormProduct);
  const { actions } = useContext(Context);
  const { postProduct } = actions;

  const onChangeFormProduct = (name, value) => {
    setFormProduct({
      ...formProduct,
      [name]: value
    })
  };

  const createProduct = async () => {
    setIsLoading(true);

    const form = new FormData();
    form.append('name', formProduct['name']);
    form.append('description', formProduct['description']);
    form.append('usage', formProduct['usage']);
    form.append('category_id', formProduct['categoryId']);
    form.append('unit_id', formProduct['unitId']);
    form.append('image', formProduct['image']);

    await postProduct(form);
    setIsLoading(false);
  };

  return ({
    isLoading,
    formProduct,
    onChangeFormProduct,
    createProduct
  });
};
export default useFormProduct;