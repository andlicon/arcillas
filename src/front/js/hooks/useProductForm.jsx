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
  const { postProduct, getOneProduct } = actions;
  const { categorys, units, productPage } = store;

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

  useEffect(() => {
    if (productId == undefined || productId == undefined) {
      // Set default productForm
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
    else if (productPage?.results) {
      // if product was looked before, then look for it inside page results
      const product = productPage.results.filter((item) => item.id == productId)[0];
      setFormProduct({
        name: product.name,
        description: product.description,
        usage: product.usage,
        categoryId: product.category_id,
        unitId: product.unit_id,
        image: product.image_url,
        id: product.id
      })
    }
    else {
      // query for product
      const queryProduct = async () => {
        const product = await getOneProduct(productId);
        setFormProduct({
          name: product.name,
          description: product.description,
          usage: product.usage,
          categoryId: product.category_id,
          unitId: product.unit_id,
          image: product.image_url,
          id: product.id
        })
      }
      queryProduct();
    }
  }, []);

  return ({
    isLoading,
    formProduct,
    onChangeFormProduct,
    createProduct
  });
};
export default useFormProduct;