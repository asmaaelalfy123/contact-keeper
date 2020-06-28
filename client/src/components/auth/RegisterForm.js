import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const RegisterForm = props => {
  const { setAlert, alerts } = useContext(AlertContext);
  const { register, errors, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );
  const [User, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (errors === 'user already exists') {
      setAlert(errors, 'danger');
      clearErrors();
    }

    //eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);
  const { name, password, password2, email } = User;
  const onChange = e => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (name == '' || email == '' || password == '') {
      setAlert('Please enter All Fields', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'> Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary btn-block'
          Value='Register'
        />
      </form>
    </div>
  );
};

export default RegisterForm;
