import React from 'react';

const Notification = ({ message, flag }) => {
  if (message === null) {
    return null
  }

  const notificatinStyles = flag === 'success' 
    ? {
      color: 'green',
    }
    : {
      color: 'red',
    };

  return (
    <div style={notificatinStyles} className="success">
      {message}
    </div>
  )
}

export default Notification;