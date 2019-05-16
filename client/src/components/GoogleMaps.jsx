import GoogleMapReact from 'google-map-react';
import React from 'react'
import API_KEY from '../../../GoogleMaps.config.js'
import MarkerList from './MarkerList.jsx'

class GoogleMaps extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
        <div style= {{height:'100vh', width:'80%'}}>
            <GoogleMapReact
            bootstrapURLKeys = {{key:API_KEY.key}}
            defaultCenter = {{lat:59, lng:30}}
            defaultZoom={11}
            >
            {/* <Markerlist markers = {this.state.address}/> */}


          </GoogleMapReact>

        </div>
    )
  }
}

export default GoogleMaps