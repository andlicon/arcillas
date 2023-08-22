import { toast } from 'react-toastify';
import {
  loginPromise,
  getUserPromise,
  getCategoryPromise
} from '../utils/promisesUtils.js'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: localStorage.getItem('token') || null,
      user: JSON.parse(localStorage.getItem('user')) || null,
      categorys: JSON.parse(localStorage.getItem('categorys')) || null,
    },
    actions: {
      login: async (credentials) => {
        const { getCategorys } = getActions();

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
        try {
          const { token, user } = await data;

          setStore({ token: token });
          localStorage.setItem('token', token);
          setStore({ user: user });
          localStorage.setItem('user', JSON.stringify(user));
          getCategorys();
          return true;
        }
        catch (error) {
          localStorage.removeItem('token');
          setStore({ token: null });
          localStorage.removeItem('user');
          setStore({ user: null });
          localStorage.setItem('categorys', null);
          setStore({ categorys: null });
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
      }
    }
  };
};

export default getState;
