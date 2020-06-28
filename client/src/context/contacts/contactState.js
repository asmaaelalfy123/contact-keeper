import React, { useReducer } from 'react';

import axios from 'axios';
import contactReducer from './contactReducer';
import ContactContext from './ContactContext';
import {
  ADD_CONTACT,
  CLEAR_CONTACTS,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CURRENT,
  GET_CONTACTS
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //GET CONTACTS
  const getContact = async contact => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Add
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
    }
  };

  //delete contacts
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //clear contacts
  const clearContactsNotCurrent = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  //set current contacts
  const setContact = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //clear current contact
  const clearContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //update contacts
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
    }
  };

  //filter contacts

  const filterContact = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        loading: state.loading,
        error: state.error,
        filterContact,
        clearFilter,
        addContact,
        deleteContact,
        setContact,
        clearContact,
        getContact,
        updateContact,
        clearContactsNotCurrent
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
