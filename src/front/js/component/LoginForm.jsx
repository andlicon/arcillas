import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import { useField } from '../hooks/useField.jsx';
import { useNavigate } from "react-router-dom";
import AnimatedInput from '../component/AnimatedInput.jsx';
import { validateLogin } from '../utils/validateUtils.js';
import {
  INPUT_TYPE_TEXT,
  INPUT_TYPE_PASSWORD
} from '../constant/inputConstant.js';

const LoginForm = () => {
  const navigate = useNavigate();
  const email = useField({ type: INPUT_TYPE_TEXT });
  const password = useField({ type: INPUT_TYPE_PASSWORD });
  const { actions } = useContext(Context);
  const { login } = actions;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const isValid = validateLogin('email', 'password', 'login');

    if (!isValid) return null;

    const credentials = {
      'email': email.value,
      'password': password.value
    }
    const response = await login(credentials);

    if (response == null) return null;
    if (response.role == 'administrador') navigate('/admin/product');

  };

  return (
    <form
      className='login__form needs-validation'
      id='login'
      onSubmit={onSubmitHandler}
      noValidate >
      <AnimatedInput
        label='Correo electrónico'
        name='email'
        id='email'
        trim={true}
        isRequired={true}
        invalidFeedback='No es un email inválido'
        bootstrapIcon='bi-person-fill'
        type={email.type}
        value={email.value}
        onChange={email.onChange} />
      <AnimatedInput
        label='Contraseña'
        name='password'
        id='password'
        trim={true}
        isRequired={true}
        invalidFeedback='No es una contraseña válida'
        bootstrapIcon='bi-key-fill'
        type={password.type}
        value={password.value}
        onChange={password.onChange} />
      <button
        type="submit"
        id='loginButton'
        disabled={false}
        className={"btn btn-primary"}>
        Iniciar sesión
      </button>
    </form>
  );
}
export default LoginForm;