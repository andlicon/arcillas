import React from 'react';
import useLoading from '../hooks/useLogin.jsx';
import { useNavigate } from "react-router-dom";
import AnimatedInput from '../component/AnimatedInput.jsx';

const LoginForm = () => {
  const {
    credentials,
    isLoading,
    setForm,
    log
  } = useLoading();

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const user = await log();

    if (user == null) return null;
    if (user.role == 'administrador') navigate('/admin/product');

  };

  return (
    <form
      className='login__form needs-validation'
      id='login'
      onSubmit={onSubmitHandler}
      noValidate >
      <AnimatedInput
        type='text'
        label='Correo electrónico'
        name='email'
        id='email'
        trim={true}
        isRequired={true}
        value={credentials['email']}
        invalidFeedback='No es un email inválido'
        bootstrapIcon='bi-person-fill'
        setValue={setForm} />
      <AnimatedInput
        type='password'
        label='Contraseña'
        name='password'
        id='password'
        trim={true}
        isRequired={true}
        invalidFeedback='No es una contraseña válida'
        bootstrapIcon='bi-key-fill'
        value={credentials['password']}
        setValue={setForm} />
      <button
        type="submit"
        id='loginButton'
        disabled={isLoading}
        className={"btn btn-primary"}>
        Iniciar sesión
      </button>
    </form>
  );
}
export default LoginForm;