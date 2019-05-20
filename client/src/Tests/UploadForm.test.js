import React from 'react';
import UploadForm from '../components/UploadForm.jsx'
import { shallow, mount } from 'enzyme';
import RecentlySaved from '../components/RecentlySaved.jsx'

describe('Renders Upload CSV form and empty MapCSVForm', () => {
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

    expect(wrapper.find('#uploadform')).toHaveStyle('display', 'none')

  })
})

describe('File upload state', () => {
  it('upload button active after uploading file', () => {
    var wrapper = shallow(<UploadForm/>)
    var chooseFile = wrapper.find('input')
    chooseFile.simulate('change', {
      target:{
        files:[
          'dummy.csv'
        ]
      }
    })
    var uploadBtn = wrapper.find('.csvUploadBtn')

    expect(uploadBtn).toContainReact( <button className = 'csvUploadBtn' disabled = {false} type = 'submit'>{'upload'}</button>)
  })

  it('upload button displays done after upload', () => {
    var wrapper = shallow(<UploadForm/>)

    wrapper.setState({
      uploadComplete:true
    })

    var uploadBtn = wrapper.find('.csvUploadBtn')
    expect(uploadBtn).toContainReact( <button className = 'csvUploadBtn' disabled = {true} type = 'submit'>{'done'}</button>
    )
  })

})

