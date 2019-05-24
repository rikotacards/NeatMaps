import GoogleMapReact from 'google-map-react';
import React from 'react';
import Marker from './Marker.jsx';

// eslint-disable-next-line react/prop-types
const GoogleMaps = ({ locationData }) => {
  let defaultPosition = { lat: 22.27583, lng: 114.154832 };
  if (locationData) {
    defaultPosition = locationData[0].coordinates;
  }
  return (
    <div style={{ height: '70vh', width: '80%' }}>
      <GoogleMapReact
        bootstrapURLKeys=""
        center={defaultPosition}
        defaultZoom={12}
      >
        {locationData
          && locationData.map((places, index) => (
            <Marker
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              colorCode={places.colorcode}
              lat={places.coordinates.lat}
              lng={places.coordinates.lng}
              text={places.CATEGORY}
            />
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMaps;
