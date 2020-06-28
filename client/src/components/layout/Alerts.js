import React, { useContext } from 'react';

import AlertContext from '../../context/alert/AlertContext';

const Alerts = () => {
  const { setAlert, alerts } = useContext(AlertContext);
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fasfa-info-circle' />
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
