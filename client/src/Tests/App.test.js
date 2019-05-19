import React from 'react';
import ReactDom from 'react-dom';
import App from '../components/app.jsx';
import { shallow } from 'enzyme';


describe('App component', () => {
  it('should render <AuthWrapper />', () => {
    var wrapper = shallow(<App/>);
    var text = wrapper.find('AuthWrapper').text()
   expect(text).toEqual('<AuthWrapper />')
  })
})

