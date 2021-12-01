import React from 'react';

function Loader() {
  return (
    <div
      style={{
        height: '100vh',
        background: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fdd835',
        fontWeight: 'bold',
        fontSize: '1.5rem',
      }}
    >
      Loading WATCHED
    </div>
  );
}

export default Loader;
