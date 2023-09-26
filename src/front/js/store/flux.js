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
  deleteProductPromise,
  getCategoryHierarchyParentsPromise,
  postQuotePromise,
  getQuotePromise
} from '../utils/promisesUtils.js'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: localStorage.getItem('token') || null,
      user: JSON.parse(localStorage.getItem('user')) || null,
      categorys: JSON.parse(localStorage.getItem('categorys')) || null,
      units: JSON.parse(localStorage.getItem('units')) || null,
      productPage: {},
      currentPage: 1,
      perPage: 10,
      filterString: '',
      quotePage: {},
      quoteList: JSON.parse(sessionStorage.getItem('quoteList')) || []
    },
    actions: {
      login: async (credentials) => {
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
          const productList = await getAllProductsPromise(filters ? filters : filterString);
          setStore({ 'productPage': productList });
          return productList;
        }
        catch (error) {
          setStore({ 'productPage': {} });
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
        }

        return null;
      },
      putProduct: async (id, form) => {
        const { token } = getStore();
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
            },
          )
        }
        catch (error) {
          console.log(error);
        }
      },
      setStoreFilter: (filters) => {
        setStore({ 'filterString': filters });
      },
      getCategoryHierarchyParents: async (id) => {
        try {
          return await getCategoryHierarchyParentsPromise(id);
        }
        catch (error) {
          console.log(error);
          return null;
        }
      },
      setCurrentPage: (page) => {
        setStore({ currentPage: page });
      },
      setPerPage: (page) => {
        setStore({ perPage: page });
      },
      addQuoteProduct: ({ product, amount }) => {
        const quoteList = getStore().quoteList;
        if (quoteList.some((quote) => quote.product.id == product.id)) {
          toast.warning('El producto ya está en tu cotización');
          return
        }
        const newQuoteList = [...quoteList, { product, amount }];
        setStore({ quoteList: newQuoteList });
        sessionStorage.setItem('quoteList', JSON.stringify(newQuoteList));
        toast.success(`Has añadido exitosamente un nuevo producto a tu lista de cotización`);
      },
      removeQuoteProduct: (productId) => {
        const quoteList = getStore().quoteList;
        const newQuoteList = quoteList.filter((quoteItem) => quoteItem.product.id != productId)
        setStore({ quoteList: newQuoteList });
        sessionStorage.setItem('quoteList', JSON.stringify(newQuoteList));
        toast.success(`Has eliminado exitosamente un producto de la lista de cotización`);
      },
      updateQuoteProduct: ({ product, amount }) => {
        const quoteList = getStore().quoteList;
        const quoteFiltered = quoteList.filter((quoteItem) => quoteItem.product.id != product.id);
        const newQuoteList = [...quoteFiltered, { product, amount }];
        setStore({ quoteList: newQuoteList });
        sessionStorage.setItem('quoteList', JSON.stringify(newQuoteList));
      },
      postQuote: async (body) => {
        try {
          const data = await toast.promise(
            postQuotePromise(body),
            {
              pending: 'Solicitud de cotización en proceso...',
              success: 'Solicitud creada con éxito, recibirá un email con su cotización en breve',
              error: {
                render({ data }) {
                  return data
                }
              }
            }
          );

          if (data.msg == 'ok') {
            const newQuoteList = [];
            setStore({ quoteList: newQuoteList });
            sessionStorage.setItem('quoteList', JSON.stringify(newQuoteList));
          }
        }
        catch (error) {
          console.log(error);
        }
      },
      getQuote: async (filter = '') => {
        try {
          const quoteList = await getQuotePromise(filter);
          setStore({ quotePage: quoteList });
          return quoteList;
        }
        catch (e) {
          setStore({ quotePage: {} });
          console.log(e)
          return {};
        }
      }
    }
  };
};

export default getState;