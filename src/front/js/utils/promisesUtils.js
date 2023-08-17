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
          resolve(data.token);
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