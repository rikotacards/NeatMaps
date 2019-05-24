import React from 'react';

// eslint-disable-next-line react/prop-types
const Marker = ({ colorCode, text }) => {
  const divStyle = {
    color: 'white',
    background: `#${colorCode}`,
    padding: '10px 5px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
  };
  return (
    <div style={divStyle}>
      {text}
    </div>
  );
};

export default Marker;
