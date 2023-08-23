import { toast } from 'react-toastify';
import {
  loginPromise,
  getCategoryPromise,
  postProductPromise,
  getUnitsPromise
} from '../utils/promisesUtils.js'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: localStorage.getItem('token') || null,
      user: JSON.parse(localStorage.getItem('user')) || null,
      categorys: JSON.parse(localStorage.getItem('categorys')) || null,
      units: JSON.parse(localStorage.getItem('units')) || null
    },
    actions: {
      login: async (credentials) => {
        const { getCategorys, getUnits } = getActions();

        try {
          const data = toast.promise(loginPromise(credentials),
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

          const { token, user } = await data;

          setStore({ token: token });
          localStorage.setItem('token', token);
          setStore({ user: user });
          localStorage.setItem('user', JSON.stringify(user));
          getCategorys();
          getUnits();
          return true;
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
          const data = toast.promise(postProductPromise(product, token),
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
          console.log(await data);
        }
      }
    }
  };
};

export default getState;
