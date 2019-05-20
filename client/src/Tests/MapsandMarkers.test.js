import React from 'react';
import GoogleMaps from '../components/GoogleMaps.jsx';
import { shallow } from 'enzyme';
import Marker from '../components/Marker.jsx'


describe('Render correct elements/components in GoogleMaps', () => {
  it('should render 2 markers if passed in 2 coordinate sets', () => {
    var wrapper = shallow(<GoogleMaps locationData = {[{coordinates:{}},{coordinates:{}}]} />)
    var GoogleMapReact = wrapper.find('Marker')
    expect(GoogleMapReact).toHaveLength(2)

  })

})

describe('Marker renders correct text', () => {
  it('renders the text passed into props', () => {
    var wrapper = shallow(<Marker text = {'location Name'}/>)

    var text = wrapper.find('div').text()
    expect(text).toEqual('location Name')

  })
})



