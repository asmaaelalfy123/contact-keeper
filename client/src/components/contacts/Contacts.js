import React, { Fragment, useContext, useEffect } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contacts/ContactContext';
import { Spinner } from '../layout/Spinner';

const Contacts = () => {
  const { contacts, filtered, loading, getContact } = useContext(
    ContactContext
  );
  useEffect(() => {
    getContact();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && !loading && contacts.length === 0) {
    return <h4>Please Add A Contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <>
          {' '}
          {filtered !== null
            ? filtered.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
        </>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
export default Contacts;
