import { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import { validateLogin } from '../utils/validateUtils.js';

const initialValue = {
  email: '',
  password: ''
}

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [credentials, setCredentials] = useState(initialValue);
  const { actions } = useContext(Context);
  const { login } = actions;

  const setForm = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const log = async () => {
    const isValid = validateLogin('email', 'password', 'login');

    if (!isValid) return null;

    setIsLoading(true);
    const data = await login(credentials);
    setIsLoading(false);

    return data;
  };

  return {
    isLoading,
    credentials,
    success,
    setForm,
    log
  };
}
export default useLoading;