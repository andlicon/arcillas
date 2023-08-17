import { toast } from 'react-toastify';
import { loginPromise } from '../utils/promisesUtils.js'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white"
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white"
        }
      ],
      token: localStorage.getItem('token') || null
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
          const data = await resp.json()
          setStore({ message: data.message })
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error)
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      login: async (credentials) => {
        const token = toast.promise(loginPromise(credentials),
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
          setStore({ token: await token });
          localStorage.setItem('token', await token);
        }
        catch (error) {
          localStorage.removeItem('token');
          setStore({ token: null });
          console.log(error);
        }
      }
    }
  };
};

export default getState;
