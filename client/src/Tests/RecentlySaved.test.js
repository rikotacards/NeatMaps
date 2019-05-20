import React from 'react';
import { shallow } from 'enzyme';
import RecentlySaved from '../components/RecentlySaved.jsx'

describe('Render correct elements/components in RecentlySaved', () => {
  it('should render add data button', () => {
    var wrapper = shallow(<RecentlySaved locationData = {[]}/>)

    var addDataButton = wrapper.find('button')
    expect(addDataButton).toHaveLength(1)
  })

  it('should render the Google Maps component', () => {
    var wrapper = shallow(<RecentlySaved  locationData = {[]}/>)
    var GoogleMaps = wrapper.find('GoogleMaps')
    expect(GoogleMaps).toHaveLength(1)
  })

  it('should render 3 marker controller buttons if 3 files are uploaded', () => {
    var wrapper = shallow(<RecentlySaved locationData = {[1,2,3]} fileName = {[1,2,3]}/>)

    var markerController = wrapper.find('.displayButton')
    expect(markerController).toHaveLength(3)

  })
})