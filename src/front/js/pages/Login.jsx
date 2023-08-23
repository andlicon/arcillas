import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext.js';
import '../../styles/login.css'
import { validateLogin } from '../utils/validateUtils.js';
import AnimatedInput from '../component/AnimatedInput.jsx';

const initialValue = {
  email: '',
  password: ''
}

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const { actions } = useContext(Context);
  const { login } = actions;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // validation of email and password, if are valid, then execute login
    const isValid = validateLogin('email', 'password', 'login');

    if (!isValid) return null;

    setLoading(true);
    const logged = await login(formValues);
    setLoading(false);

    if (logged) {
      navigate('/dashboard');
    }
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
              value={formValues['email']}
              invalidFeedback='No es un email inválido'
              bootstrapIcon='bi-person-fill'
              setValue={onChangeInput} />
            <AnimatedInput
              type='password'
              label='Contraseña'
              name='password'
              id='password'
              trim={true}
              isRequired={true}
              invalidFeedback='No es una contraseña válida'
              bootstrapIcon='bi-key-fill'
              value={formValues['password']}
              setValue={onChangeInput} />
            <button
              type="submit"
              id='loginButton'
              disabled={loading}
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