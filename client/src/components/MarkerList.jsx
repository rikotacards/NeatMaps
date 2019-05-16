import React from 'react';
import Marker from './Marker.jsx'

var Markerlist = (props) =>{
  return(
    <div>
      {props.markers.map((i,index)=>
        <Marker lat={i.lat} lng = {i.lng} text = {i.text} key = {index}/>)}
    </div>
  )
}

export default Markerlist