import React from 'react';
import '../../styles/login.css'
// components
import FormInput from '../component/FormInput.jsx';

const Login = () => {
  return (
    <div className='container'>
      <div className='login row'>
        <div className='login__presentation col-7'>
          presentation
        </div>
        <div className='login__logger col-5'>
          <h2>
            Iniciar sesión
          </h2>
          <form className='login__form'>
            <FormInput type='text' label='Correo electrónico' id='email' />
            <FormInput type='password' label='Contraseña' id='password' />
          </form>
          <div className='login__help'>
            help
          </div>
        </div>
      </div>
    </div>
  )
};
export default Login;