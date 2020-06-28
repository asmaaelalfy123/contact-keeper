import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contacts/ContactContext';

const ContactFilter = () => {
  const { filterContact, filtered, clearFilter } = useContext(ContactContext);

  const text = useRef();

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onchange = e => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };
  
  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Find Contact.....'
        onChange={onchange}
      />
    </form>
  );
};

export default ContactFilter;
