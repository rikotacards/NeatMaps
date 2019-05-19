import React from 'react';
import UploadForm from '../components/UploadForm.jsx'
import { shallow, mount } from 'enzyme';

describe('Renders Upload CSV form and empty map', () => {
  it('should render one form for CSV uploading', () => {
    var wrapper = shallow(<UploadForm/>)
    var form = wrapper.find('form')
    expect(form).toHaveLength(1)
  })

  it('should render the Map component', () => {
    var wrapper = shallow(<UploadForm/>)
    var map = wrapper.find('MapCSVForm')
    expect(map).toHaveLength(1)

  })
})

describe('Visibility of upload form', () => {
  it('should be hidden before + is clicked', () => {
    var wrapper = shallow(<UploadForm/>)
    // var form = wrapper.find('#uploadform')
    expect(wrapper.find('#uploadform')).toHaveStyle('display', 'none')

  })
})