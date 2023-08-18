import { toast } from 'react-toastify';
import {
  loginPromise,
  getUserPromise
} from '../utils/promisesUtils.js'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: localStorage.getItem('token') || null,
      user: JSON.parse(localStorage.getItem('user')) || null
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      login: async (credentials) => {
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
    }
  };
};

export default getState;
