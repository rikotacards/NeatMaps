import GoogleMapReact from 'google-map-react';
import React from 'react'
import API_KEY from '../../../GoogleMaps.config.js'
import Marker from './Marker.jsx'

class GoogleMaps extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    var defaultPosition = {lat:22.27583, lng:114.154832}
    if(this.props.locationData){
      defaultPosition = this.props.locationData[0].coordinates
    }
    return(
        <div style={{height:'70vh', width:'80%'}}>
          <GoogleMapReact bootstrapURLKeys='' center={defaultPosition} defaultZoom={12}>
            {this.props.locationData &&this.props.locationData.map((places,index)=>
            <Marker key={index} colorCode={places.colorcode} lat={places.coordinates.lat} lng={places.coordinates.lng}
              text={places.CATEGORY} />
            )}
          </GoogleMapReact>
        </div>
    )
  }
}

export default GoogleMaps