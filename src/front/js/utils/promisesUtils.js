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

export const getCategoryPromise = () => {
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
        reject(data.msg);
      }
    }
    catch (error) {
      console.log(error);
      reject('Ocurrio un error inesperado');
    }
  });
}

export const getUnitsPromise = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/units`);

      const data = await response.json();

      if (response.ok) {
        resolve(data);
      }
      else {
        reject(data.msg);
      }
    }
    catch (error) {
      console.log(error);
      reject('Ha ocurrido un error inesperado');
    }

  });
}

export const postProductPromise = async (procuct, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: procuct,
      });

      const data = await response.json();

      if (response.ok) {
        resolve(data);
      }
      else {
        reject(data.message)
        console.log(data.msg);
      }
    }
    catch (error) {
      console.log(error);
      reject('Ha ocurrido algún error interno');
    }
  });
}

export const getAllProductsPromise = async (filters = '') => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(process.env.BACKEND_URL + '/products' + filters);
      const data = await response.json();

      if (response.ok) {
        resolve(data)
      }
      else {
        reject(data.message);
      }
    }
    catch (error) {
      console.log(error);
      reject('Ha ocurrido algún error interno');
    }
  });
};

export const getCategoryHierarchy = (id) => {
  return new Promise(
    async (resolve, reject) => {
      try {
        const response = await fetch(process.env.BACKEND_URL + '/categorys/' + id + '/hierarchy');
        const data = await response.json();

        if (response.ok) {
          resolve(data);
        }
        else {
          resolve(data.msg);
        }
      }
      catch (error) {
        reject('Ha ocurrido algún error interno');
      }
    }
  );
}

export const getOneProductPromise = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(process.env.BACKEND_URL + '/products/' + id);
      const data = await response.json();

      if (response.ok) {
        resolve(data);
      }
      else {
        reject(data.message);
      }
    }
    catch (error) {
      console.log(error);
      reject('Ha ocurrido algún error interno');
    }
  });
};
export const putProductPromise = async (id, form, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(process.env.BACKEND_URL + '/products/' + id, {
        method: 'PUT',
        body: form,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      const data = await response.json();
      if (response.ok) resolve(data);
      else reject(data.message)
    }
    catch (error) {
      console.log(error)
      reject('Ha ocurrido algún error interno');
    }
  });
};