import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contacts/ContactContext';

const Navbar = ({ title, icon }) => {
  const { logout, user, isAuthenticated } = useContext(AuthContext);
  const { clearContactsNotCurrent } = useContext(ContactContext);

  const onLogOut = () => {
    logout();

    clearContactsNotCurrent();
  };

  const authLink = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href='#' onClick={onLogOut}>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>{isAuthenticated ? authLink : guestLink}</ul>
    </div>
  );
};
Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas  fa-id-card-alt'
};
export default Navbar;
