import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/login.css'
// components
import FormInput from '../component/FormInput.jsx';

const initialValue = {
  email: '',
  password: ''
}

const Login = () => {
  const [formValues, setFormValues] = useState(initialValue)
  const { actions } = useContext(Context);
  const { login } = actions;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // validation of email and password, if are valid, then execute login
    login(formValues);
  };

  const onChangeInput = (value, name) => {
    setFormValues({
      ...formValues,
      [name]: value
    })
  };

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
          <form
            className='login__form'
            onSubmit={onSubmitHandler} >
            <FormInput
              type='text'
              label='Correo electrónico'
              name='email'
              id='email'
              value={formValues['email']}
              setValue={onChangeInput} />
            <FormInput
              type='password'
              label='Contraseña'
              name='password'
              id='password'
              value={formValues['password']}
              setValue={onChangeInput} />
            <button
              type="submit"
              className="btn btn-outline-primary">
              Iniciar sesión
            </button>
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