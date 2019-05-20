import React from 'react';
import { shallow, mount } from 'enzyme';
import MapCSVForm from '../components/MapCSVForm.jsx'

describe('Render correct elements/components in MapCSVForm', () => {

  it('should render a column mapping form', () => {
    var wrapper = shallow(<MapCSVForm/>)
    var form = wrapper.find('form')
    expect(form).toHaveLength(1)
  })

  it('should render the RecentlySaved component', () => {
    var wrapper = shallow(<MapCSVForm/>)
    var RecentlySaved = wrapper.find('RecentlySaved')
    expect(RecentlySaved).toHaveLength(1)
  })
})

describe('Correctly display map form depending on fileUpload state', () => {

  it('column label should be gray if uploadStatus is false', () => {
    var wrapper = shallow (<MapCSVForm/>)
    wrapper.setProps({uploadStatus: false})

    var columnStyle = wrapper.find('.column1')
    expect(columnStyle).toHaveStyle('color', 'lightgray')
  })

  it('column label should be black if uploadStatus is false', () => {
    var wrapper = shallow (<MapCSVForm/>)
    wrapper.setProps({uploadStatus: true})

    var columnStyle = wrapper.find('.column1')
    expect(columnStyle).toHaveStyle('color', 'black')
  })

})