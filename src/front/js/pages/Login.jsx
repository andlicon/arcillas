import React from 'react';
import { useNavigate } from "react-router-dom";
import useLoading from '../hooks/useLogin.jsx';
import '../../styles/login.css'
import AnimatedInput from '../component/AnimatedInput.jsx';

const Login = () => {
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

    navigate('/admin/product');
  };

  return (
    <div className='container'>
      <div className='login row'>
        <div className='login__presentation col-7'>
          presentation
        </div>
        <div className='login__logger col-5'>
          <h2 className='login__logger_title'>
            Iniciar sesión
          </h2>
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
          <div className='login__help'>
            ¿Olvidaste tu contraseña?
          </div>
        </div>
      </div>
    </div>
  )
};
export default Login;