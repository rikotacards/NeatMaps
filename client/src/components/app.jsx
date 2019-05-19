import React from 'react';
import UploadForm from './UploadForm.jsx'
import {BrowserRouter, Route, HashRouter} from 'react-router-dom';
import AuthWrapper from './Login.jsx'


class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(

      <BrowserRouter>
      <AuthWrapper/>
      {/* <Route path = '/' component = {Login}/> */}
      {/* <Route path='/home' component ={  UploadForm}/> */}

      </BrowserRouter>


    )
  }
}

export default App