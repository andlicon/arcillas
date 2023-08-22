import {
  orderCategorys
} from '../utils/orderUtils.js';

export const loginPromise = (credentials) => {
  return (
    new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-type': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok) {
          resolve(data);
        }
        else {
          reject(data.message);
        }

      }
      catch {
        reject('Ocurrio un error interno.');
      }
    })
  )
}

export const getUserPromise = async (id) => {

}

export const getCategoryPromise = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/categorys`, {
        method: 'GET'
      });

      const data = await response.json();

      if (response.ok) {
        resolve(orderCategorys(data));
      }
      else {
        reject(data.message);
      }
    }
    catch (error) {
      console.log(error);
      reject('Ocurrio un error inesperado');
    }
  });
}