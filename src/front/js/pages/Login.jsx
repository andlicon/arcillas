import React from 'react';
import '../../styles/login.css';
import LoginForm from '../component/LoginForm.jsx';
import logo from '../../img/arcillas-logo.png';

const Login = () => {
  return (
    <div className='container centrado login-container'>
      <div className='login row'>
        <div className='login__presentation col-sm-5 col-12'>
          presentation
        </div>
        <div className='login__logger col-sm-7 col-12'>
          <div className='center'>
            <img src={logo} alt="logo" className='logo' />
            <h2 className='login__logger_title'>
              Iniciar sesión
            </h2>
          </div>
          <LoginForm />
          <div className='login__help'>
            ¿Olvidaste tu contraseña?
          </div>
        </div>
      </div>
    </div>
  )
};
export default Login;