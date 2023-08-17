import React from 'react';
import '../../styles/login.css'

const Login = () => {
    return(
        <div className='container'>
            <div className='login row'>
                <div className='login__presentation col-7'>
                    presentation
                </div>
                <div className='login__logger col-5'>
                    <form className='login__form'>
                        form
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