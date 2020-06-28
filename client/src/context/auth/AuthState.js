import AuthContext from './AuthContext';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

import React, { useReducer } from 'react';

import AuthReducer from './AuthReducer';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    errors: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //loaded users
  const loadUser = async () => {
    //token in global

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  //register user
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };

  //login user

  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  //clear errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  //logout user
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        errors: state.errors,
        register,
        loadUser,
        logout,
        clearErrors,
        login
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
