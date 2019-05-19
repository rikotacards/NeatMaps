import React from 'react';
import UploadForm from './UploadForm.jsx'
import {BrowserRouter} from 'react-router-dom';
import AuthWrapper from './AuthWrapper.jsx'


class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(

      <BrowserRouter>
        <AuthWrapper/>
      </BrowserRouter>


    )
  }
}

export default App