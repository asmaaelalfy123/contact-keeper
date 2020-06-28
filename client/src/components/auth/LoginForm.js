import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const LoginForm = props => {
  const { setAlert, alerts } = useContext(AlertContext);
  const { login, errors, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );
  const [User, setUser] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (errors === 'Invalid Credentials') {
      setAlert(errors, 'danger');
      clearErrors();
    }

    //eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);

  const { password, email } = User;
  const onChange = e => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (email == '' || password == '') {
      setAlert('Please Fill All Fields', 'danger');
    } else {
      login({ email, password });
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>

        <input
          type='submit'
          className='btn btn-primary btn-block'
          Value='Login'
        />
      </form>
    </div>
  );
};

export default LoginForm;
