import { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import { useNavigate } from "react-router-dom";

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
  const [formProduct, setFormProduct] = useState(initialValue);
  const { actions, store } = useContext(Context);
  const { getOneProduct } = actions;
  const { categorys, units, productPage } = store;
  const navigate = useNavigate();

  const onChangeFormProduct = ({ target }) => {
    setFormProduct({
      ...formProduct,
      [target.name]: target.name != 'image' ? target.value : target.files[0]
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
    form.append('id', formProduct['id']);
    return form;
  }

  const getProductById = async () => {
    const product = await getOneProduct(productId);
    if (product) {
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
      navigate('/not-found');
    }
  }

  useEffect(() => {
    if (productId == undefined) {
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
    else {
      getProductById();
    }
  }, []);

  return ({
    formProduct,
    onChangeFormProduct,
    getForm
  });
};
export default useFormProduct;