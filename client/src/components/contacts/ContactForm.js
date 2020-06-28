import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contacts/ContactContext';

const ContactForm = () => {
  const { addContact, current, updateContact, clearContact } = useContext(
    ContactContext
  );
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [current]);

  const { email, name, phone, type } = contact;
  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current == null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };
  const clearAll = () => {
    clearContact();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Contact Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        name='email'
        placeholder='Email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        placeholder='Phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        value='personal'
        name='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal <span> </span>
      <input
        type='radio'
        value='professional'
        name='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Edit contact' : 'Add Contact'}
          className='btn btn-block btn-primary'
        />
      </div>
      {current && (
        <div>
          <button
            className='btn btn-light btn-block'
            type='submit'
            onClick={clearAll}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};
export default ContactForm;
