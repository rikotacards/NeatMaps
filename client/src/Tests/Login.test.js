import React from 'react';
import { shallow, mount } from 'enzyme';
import {MemoryRouter} from 'react-router';

import AuthWrapper from '../components/AuthWrapper.jsx';
import LoginForm from '../components/LoginForm.jsx'

describe('Render router in AuthWrapper', () => {
  it('should render <Router /> in AuthWrapper', () => {
    var wrapper = shallow(<AuthWrapper/>)
    var text = wrapper.find('div').text()
    expect(text).toEqual('<Route />')
  })
})

describe('Render login form from any path but not upload form', () => {
  it('should render login form, should not render upload form', () => {
    var wrapper = mount(
      <MemoryRouter intialEntries = {['/random']}>
         <AuthWrapper/>
      </MemoryRouter>
    )
    expect(wrapper.find('form')).toHaveLength(1)
    expect(wrapper.find('UploadForm')).toHaveLength(0)

    wrapper.unmount()
  })


})

describe('Display unsuccessful login with failed credentials', () => {

  it('should display failed login without credentials', async() => {
    var wrapper = mount(
     <LoginForm/>)

    var loginBtn = wrapper.find('button')

    loginBtn.simulate('submit')

    var text =  wrapper.find('.loginStatus').text()

     expect(text).toEqual('Incorrect username or password. Please try again.')

     wrapper.unmount()
    })

  it('should display failed login with incorrect password', () => {
    var wrapper = mount(
      <LoginForm/>
    )
    var userInput = wrapper.find('.passwordInput')

    userInput.simulate('change', { target:{
      value:'!!!'
    }
  })
    var loginBtn = wrapper.find('.loginBtn')

    loginBtn.simulate('submit')

    var text = wrapper.find('.loginStatus').text()

    expect(text).toEqual('Incorrect username or password. Please try again.')

  })

})

