import { toast } from 'react-toastify';
import {
  loginPromise,
  getCategoryPromise,
  postProductPromise,
  getUnitsPromise,
  getAllProductsPromise,
  getCategoryHierarchy,
  getOneProductPromise,
  patchProductPromise,
  deleteProductPromise
} from '../utils/promisesUtils.js'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: localStorage.getItem('token') || null,
      user: JSON.parse(localStorage.getItem('user')) || null,
      categorys: JSON.parse(localStorage.getItem('categorys')) || null,
      units: JSON.parse(localStorage.getItem('units')) || null,
      productPage: {},
      filterString: ''
    },
    actions: {
      login: async (credentials) => {
        const { getCategorys, getUnits } = getActions();

        try {
          const data = await toast.promise(loginPromise(credentials),
            {
              pending: 'Iniciando sesión...',
              success: 'Has iniciado sesión.',
              error: {
                render({ data }) {
                  return data
                }
              }
            }
          )

          const { token, user } = data;

          setStore({ token: token });
          localStorage.setItem('token', token);
          setStore({ user: user });
          localStorage.setItem('user', JSON.stringify(user));
          getCategorys();
          getUnits();
          return user;
        }
        catch (error) {
          localStorage.removeItem('token');
          setStore({ token: null });
          localStorage.removeItem('user');
          setStore({ user: null });
          console.log(error);
          return false;
        }
      },
      getCategorys: async () => {
        try {
          const categorys = await getCategoryPromise();
          localStorage.setItem('categorys', JSON.stringify(categorys));
          setStore({ categorys: categorys });
        }
        catch (error) {
          console.log(error);
          localStorage.removeItem('token');
          setStore({ categorys: null });
        }
      },
      getUnits: async () => {
        try {
          const response = await getUnitsPromise();
          localStorage.setItem('units', JSON.stringify(response));
          setStore({ 'units': response })
        }
        catch (error) {
          console.log(error);
          localStorage.removeItem('units');
          setStore({ 'units': [] })
        }
      },
      postProduct: async (product) => {
        const { token } = getStore();

        try {
          const data = await toast.promise(postProductPromise(product, token),
            {
              pending: 'Anadiendo producto...',
              success: 'Has añadido el producto exitosamente',
              error: {
                render({ data }) {
                  return data
                }
              }
            }
          )
        }
        catch (error) {
          console.log(error);
        }
      },
      getProductPage: async (filters) => {
        const { setStoreFilter } = getActions();
        const { filterString } = getStore();

        if (filters) {
          setStoreFilter(filters);
        }

        try {
          const product_list = await getAllProductsPromise(filters ? filters : filterString);

          setStore({ 'productPage': product_list });
          return product_list;
        }
        catch (error) {
          setStore({ 'productPage': [] });
          console.log(error);
          return {};
        }
      },
      getCategoryHierarchy: async (id) => {
        try {
          const response = await getCategoryHierarchy(id);
          return response;
        }
        catch (error) {
          console.log(error);
          return [];
        }
      },
      getOneProduct: async (id) => {
        try {
          const product = await getOneProductPromise(id);
          return product;
        }
        catch (error) {
          console.log(error);
          return null;
        }

        return null;
      },
      putProduct: async (id, form) => {
        const { token, productPage } = getStore();
        let data = null;

        try {
          data = await toast.promise(patchProductPromise(id, form, token), {
            pending: 'Modificando producto...',
            success: 'Has modificado el producto exitosamente',
            error: {
              render({ data }) {
                return data
              }
            }
          });
        }
        catch (error) {
          console.log(error);
        }

        return data;
      },
      deleteProduct: async (id) => {
        const { token } = getStore();

        try {
          const data = await toast.promise(deleteProductPromise(id, token),
            {
              pending: 'Borrando producto...',
              success: 'Has borrado el producto exitosamente',
              error: {
                render({ data }) {
                  return data
                }
              }
            }
          )
        }
        catch (error) {
          console.log(error);
        }
      },
      setStoreFilter: (filters) => {
        setStore({ 'filterString': filters });
      }
    }
  };
};

export default getState;