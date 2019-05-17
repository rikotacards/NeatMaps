import React from 'react';
import Marker from './Marker.jsx'
//import Marker from 'google-map-react'

var Markerlist = (props) =>{
  for (var i in props.markers){

  }
  return(
      props.markers.map((i,index)=>
        <Marker
          // position = {{lat:i.coordinates.lat, lng:i.coordinates.lng}}
          lat={i.coordinates.lat}
          lng = {i.coordinates.lng}
          text = {i.CATEGORY}
          key = {index}
        />)

  )
}

export default Markerlist