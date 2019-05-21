import React from 'react';
//import Marker from 'google-map-react';

var Marker = (props) => {
  var divStyle = {
    color: 'white',
    background: `#${props.colorCode}`,
    padding: '10px 5px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:'10px',
  }
  return(
    <div style={divStyle}>
      {props.text}
    </div>
  )
}

export default Marker