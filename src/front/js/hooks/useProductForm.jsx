import { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';

const initialValue = {
  name: '',
  description: '',
  usage: '',
  categoryId: 0,
  unitId: 0,
  image: undefined,
  id: undefined
}

const useFormProduct = (productId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formProduct, setFormProduct] = useState(initialValue);
  const { actions, store } = useContext(Context);
  const { postProduct } = actions;
  const { categorys, units } = store;

  useEffect(() => {
    if (productId) {

    }
    else {
      setFormProduct({
        name: '',
        description: '',
        usage: '',
        categoryId: categorys[0]?.id,
        unitId: units[0]?.id,
        image: undefined,
        id: undefined
      })
    }
  }, []);



  const onChangeFormProduct = (name, value) => {
    setFormProduct({
      ...formProduct,
      [name]: value
    })
  };

  const getForm = () => {
    const form = new FormData();
    form.append('name', formProduct['name']);
    form.append('description', formProduct['description']);
    form.append('usage', formProduct['usage']);
    form.append('category_id', formProduct['categoryId']);
    form.append('unit_id', formProduct['unitId']);
    form.append('image', formProduct['image']);
    return form;
  }

  const createProduct = async () => {
    setIsLoading(true);

    const form = getForm();

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